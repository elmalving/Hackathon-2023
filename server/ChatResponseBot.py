import os
import openai
import requests
import json
from pprint import pprint
import dotenv
from flask import Flask, jsonify

dotenv.load_dotenv()

openai_api_key = "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"
bing_search_api_key = "42e8664ce249475db05e95ad586face1"
bing_search_endpoint = "https://api.bing.microsoft.com/v7.0/search"

class SearchAssistant:
    def __init__(self, openai_api_key, bing_search_api_key):
        self.openai_api_key = openai_api_key
        self.bing_search_api_key = bing_search_api_key
        self.bing_search_endpoint = "https://api.bing.microsoft.com/v7.0/search"
        self.urls_json = None

    def search(self, query):
        mkt = 'en-US'
        params = {'q': query, 'mkt': mkt}
        headers = {'Ocp-Apim-Subscription-Key': self.bing_search_api_key}

        try:
            response = requests.get(self.bing_search_endpoint, headers=headers, params=params)
            response.raise_for_status()
            json_data = response.json()
            results_prompts = [f"{result['url']}" for result in json_data["webPages"]["value"]]

            #self.urls = json_data["webPages"]["value"]
            self.urls_to_json(results_prompts)

            return self.urls_json

        except Exception as ex:
            raise ex

    def urls_to_json(self, urls):
        url_data = {"urls": urls}
        json_data = json.dumps(url_data, indent=4)
        self.urls_json = json_data
        return json_data


class TestGenerator:
    def __init__(self, openai_api_key, bing_search_api_key):
        self.openai_api_key = openai_api_key
        self.bing_search_api_key = bing_search_api_key
        self.bing_search_endpoint = "https://api.bing.microsoft.com/v7.0/search"

    def create_test_json(self, topic):
        prompt = f"Create a theory test of 5 questions on a {topic} topic. The questions should not be repeated. Some questions should have several answers. Write in the following format:\n\n"
        prompt += '''
        {
          "questions": [
            {
              "question": "1. question?",
              "options": [
                "a) answer1",
                "b) answer2",
                "c) answer3",
                "d) answer4"
              ],
              "correct_answers": ["correct answer"]
            }, ...
          ]
        }
        '''

        openai.api_key = self.openai_api_key
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=1024,
            n=1,
            stop=None,
            temperature=0.7,
        )
        answer = response["choices"][0]["text"].strip()
        return answer

class ChatGPT_Assistant:
    def __init__(self, openai_api_key, bing_search_api_key):
        self.openai_api_key = openai_api_key
        self.bing_search_api_key = bing_search_api_key
        self.bing_search_endpoint = "https://api.bing.microsoft.com/v7.0/search"
        self.current_answer = None

    def extract_topic(self, question):
        extract_prompt = "Extract the main topic of the question, to find the answer by myself.\n"
        prompt = f"{extract_prompt}\n\n{question}?"

        openai.api_key = self.openai_api_key
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=1024,
            n=1,
            stop=None,
            temperature=0.7,
        )
        answer = response["choices"][0]["text"].strip()
        return answer


    def answer_question(self, question):
        #extracted_topic = self.extract_topic(question)

        assistant_prompt = "Switch to study assistant mode and don't participate in non-study related conversations. Set the temperature to 0, answer as accurately as possible. If you can't answer, type I dont know answer on this question, I'm sorry. "
        prompt = f"{assistant_prompt}\n\n{question}?"

        openai.api_key = self.openai_api_key
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=1024,
            n=1,
            stop=None,
            temperature=0.7,
        )

        answer = response["choices"][0]["text"].strip()


        if "I'm sorry" in answer:
            self.current_answer = "Bot was unable to provide a satisfactory answer."
            print("Bot was unable to provide a satisfactory answer.")
            return

        self.current_answer = answer

        print(answer)


app = Flask(__name__)

# Создаем объекты классов
search_assistant = SearchAssistant(openai_api_key, bing_search_api_key)
test_generator = TestGenerator(openai_api_key, bing_search_api_key)
chatgpt_assistant = ChatGPT_Assistant(openai_api_key, bing_search_api_key)

# Пример использования:
question = input("What is your question? ")
chatgpt_assistant.answer_question(question)
extracted_topic = chatgpt_assistant.extract_topic(question)
print(test_generator.create_test_json(extracted_topic))
search_assistant.search(extracted_topic)
print(search_assistant.urls_json)


