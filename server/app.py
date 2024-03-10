from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from config import ApplicationConfig
from documents import db, User, Assignment
from ChatResponseBot import SearchAssistant, ChatGPT_Assistant, TestGenerator

openai_api_key = "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"
bing_search_api_key = "42e8664ce249475db05e95ad586face1"
bing_search_endpoint = "https://api.bing.microsoft.com/v7.0/search"

search_assistant = SearchAssistant(openai_api_key, bing_search_api_key)
test_generator = TestGenerator(openai_api_key, bing_search_api_key)
chatgpt_assistant = ChatGPT_Assistant(openai_api_key, bing_search_api_key)


app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)


@app.route('/@me')
def get_current_user():
    user_id = session.get('user_id')
    if user_id is None:
        return jsonify({'error': 'Unauthorized'}), 401

    user = User.objects(id=user_id).first()
    return jsonify({
        'id': user.id,
        'email': user.email,
        'name': user.name
    })


@app.route('/@assignment')
def get_assignment():
    email = request.args.get('email')

    user_id = session.get('user_id')
    if user_id is None:
        return jsonify({'error': 'Unauthorized'}), 401

    user = User.objects(id=user_id).first()

    if user.email == 'test@gmail.com' and email:
        user = User.objects(email=email).first()

    assignments = [
        {
            'id': assignment.id,
            'subject': assignment.subject,
            'difficulty': assignment.difficulty,
            'text': assignment.text,
            'url': assignment.url,
            'assigned_date': assignment.assigned_date,
            'rect': assignment.rect,
            'answer': assignment.answer
        }
        for assignment in user.assignments
    ]

    return jsonify({
        'assignments': assignments
    })


@app.route('/@all_email')
def get_all_email():
    user_id = session.get('user_id')
    if user_id is None:
        return jsonify({'error': 'Unauthorized'}), 401

    emails = User.objects.only('email').exclude('id')

    return jsonify(emails)


@app.route('/add_assignment', methods=['POST'])
def add_assignment():
    subject = request.json['subject']
    difficulty = request.json['difficulty']
    text = request.json['task']
    url = request.json['url']
    email = request.json['email']
    rect = request.json['rectId']

    user_id = session.get('user_id')
    if user_id is None:
        return jsonify({'error': "Account doesn't exist"}), 401

    user = User.objects(email=email).first()

    if any(assignment.rect == rect for assignment in user.assignments):
        return jsonify({'error': 'Rect is already occupied'}), 409

    new_assignment = Assignment(subject=subject, difficulty=difficulty, text=text, url=url, rect=rect)
    new_assignment.save()

    user.assignments.append(new_assignment)
    user.save()

    return jsonify({'success': 'Assignment added successfully'}), 200


@app.route('/add_answer', methods=['POST'])
def add_answer():
    try:
        answer = request.json['answer']
        rect = request.json['rectId']
    except KeyError:
        return jsonify({'error': 'Invalid JSON data'}), 400

    user_id = session.get('user_id')
    if user_id is None:
        return jsonify({'error': "User not logged in"}), 401

    user = User.objects(id=user_id).first()
    if not user:
        return jsonify({'error': "User not found"}), 404

    for assignment in user.assignments:
        if assignment.rect == rect:
            assignment.answer = answer
            assignment.save()

            return jsonify({'success': 'Answer added successfully'}), 200


@app.route('/add_grade', methods=['POST'])
def add_grade():
    try:
        comment = request.json['comment']
        grade = request.json['grade']
        email = request.json['email']
        rect = request.json['rectId']
    except KeyError:
        return jsonify({'error': 'Invalid JSON data'}), 400

    user_id = session.get('user_id')
    if user_id is None:
        return jsonify({'error': "User not logged in"}), 401

    user = User.objects(email=email).first()
    if not user:
        return jsonify({'error': "User not found"}), 404

    for assignment in user.assignments:
        if assignment.rect == rect:
            assignment.comment = comment
            assignment.grade = grade
            assignment.rect = None
            assignment.save()

            return jsonify({'success': 'Answer added successfully'}), 200


@app.route('/register', methods=['POST'])
def register_user():
    email = request.json['email']
    password = request.json['password']
    name = request.json['firstName']
    surname = request.json['lastName']
    degree = request.json['degree']

    user_exists = User.objects(email=email).first() is not None

    if user_exists:
        return jsonify({'error': 'Email is already used'}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, name=name, surname=surname, degree=degree)
    new_user.save()

    session['user_id'] = new_user.id

    return jsonify({
        'id': new_user.id,
        'email': new_user.email
    })


@app.route('/login', methods=['POST'])
def login_user():
    email = request.json['email']
    password = request.json['password']

    user = User.objects(email=email).first()

    if user is None or not bcrypt.check_password_hash(user.password, password):
        return jsonify({'error': 'Unauthorized'}), 401

    session['user_id'] = user.id

    return jsonify({
        'id': user.id,
        'email': user.email
    })


@app.route('/logout', methods=['POST'])
def logout_user():
    session.pop('user_id')
    return '200'


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
