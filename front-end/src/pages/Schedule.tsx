import React, { useState, useEffect } from "react";
import httpClient from "../httpClient.jsx";
import AssignmentPopUp from '../components/AssignmentPopUp.jsx';
import { Assignment } from "../types.ts";
import '../css/schedule.css'

const Schedule = () => {
    const rowAmount = 7;
    const columnAmount = 14;
    const daysOfWeek = ['Monday', 'Thursday', 'Wednesday', 'Tuesday', 'Friday', 'Saturday', 'Sunday'];
    const [divData, setDivData] = useState(Array.from({ length: columnAmount * rowAmount }, (_, index) => ({ id: index, subject: '', color: 'inherit', clicked: false })));
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const colors = {
        'Math': {
            'easy': '#B6F09C',
            'medium': '#9EF37A',
            'hard': '#49F300'
        },
        'Physics': {
            'easy': '#D27430',
            'medium': '#D25930',
            'hard': '#D0302F'
        },
        'Czech Language': {
            'easy': '#E26F20',
            'medium': '#E45A20',
            'hard': '#E44020'
        },
        'Geography': {
            'easy': '#82DBF7',
            'medium': '#83CDCD',
            'hard': '#629A9A'
        }
    }

    const createAssignment = (e) => {
        if (!/^\d+$/.test(e.target.id)) { // isDigit method -_-
            return;
        }
        setDivData(divData.map(div => {
            div.clicked = div.id == e.target.id;
            return div;
        }));
    }

    const clearClicked = () => {
        setDivData(divData.map(div => {
            div.clicked = false;
            return div;
        }));
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get('//localhost:5000/@assignment');
                setAssignments(response.data.assignments);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
    }, []);
    
    useEffect(() => {
        setDivData((prevDivData) => 
            prevDivData.map(div => {
                assignments.forEach((assignment) => {
                    if (div.id == assignment.rect) {
                        div.subject = assignment.subject;
                        div.color = colors[assignment.subject][assignment.difficulty];
                    }
                });
                return div;
            }
        ));
    }, [assignments]);

    return (
        <div className="content">
            <div className="schedule">
                <div className="day-container">
                    <div className="day">Mon</div>
                    <div className="day">Thu</div>
                    <div className="day">Wed</div>
                    <div className="day">Thu</div>
                    <div className="day">Fri</div>
                    <div className="day">Sat</div>
                    <div className="day">Sun</div>
                </div>
                <div className="row-container">
                    {[...Array(columnAmount)].map((_, outer_index) => (
                    <div key={outer_index} className="row">
                        <div className="time">{outer_index + rowAmount}:00</div>
                        {[...Array(rowAmount)].map((_, index) => {
                            const rectId = index + outer_index * rowAmount;
                            const divItem = divData[rectId];
                            const color = divItem.color;
                            const assignment = assignments.find(assignment => assignment.rect === rectId);

                            return (
                        <div
                            key={index}
                            id={String(rectId)}
                            data-day={daysOfWeek[index]}
                            data-hour={outer_index + rowAmount}
                            onClick={createAssignment}
                            className="rect"
                            style={{ backgroundColor: color }}
                        >
                                {divItem.subject && (
                            <div id={String(rectId)} className="centralized">
                                <span id={String(rectId)}>{divItem.subject}</span>
                            </div>
                                )}
                                {divItem.clicked && (
                            <AssignmentPopUp onClose={clearClicked} assignment={assignment} color={color} rectId={rectId} />
                                )}
                        </div>
                            );
                        })}
                    </div>
                    ))}
                </div>
            </div>
            <div className="model-container">
                <div className="model-row">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M26.9063 19.3115L26.8913 19.3202C26.8829 19.3252 26.8788 19.3325 26.8788 19.3421L26.8763 20.2796" stroke="#794AFF" strokeWidth="2"/>
                        <path d="M26.5844 28.6069C26.4486 28.9648 26.2671 29.3262 26.04 29.6912" stroke="#794AFF" strokeWidth="2"/>
                        <path d="M5.94815 29.6888C5.73899 29.3492 5.56232 29 5.41815 28.6413C5.40503 28.6081 5.38878 28.5981 5.35815 28.5831" stroke="#794AFF" strokeWidth="2"/>
                        <path d="M5.06189 20.2912C5.06689 20.2862 5.0746 20.2825 5.08501 20.28C5.09876 20.2767 5.10564 20.2677 5.10564 20.2531L5.10814 19.3087" stroke="#794AFF" strokeWidth="2"/>
                        <path d="M12.4563 0H19.55C20.7113 0.103125 21.5319 1.01 21.5319 2.15625C21.5323 2.74292 21.5319 3.32188 21.5306 3.89313C21.5306 3.90659 21.5342 3.91986 21.541 3.93159C21.5478 3.94333 21.5576 3.95312 21.5694 3.96C24.5694 5.67438 26.5581 8.71 26.8413 12.1725C26.8638 12.4479 26.875 12.8644 26.875 13.4219C26.875 15.3652 26.875 17.3083 26.875 19.2512C26.875 19.2662 26.8804 19.2787 26.8913 19.2887C26.8983 19.295 26.9033 19.3025 26.9063 19.3113L26.8913 19.32C26.8829 19.325 26.8788 19.3323 26.8788 19.3419L26.8763 20.2794C26.8754 22.5769 26.8748 24.8731 26.8744 27.1681C26.874 27.5377 26.7773 28.0173 26.5844 28.6069C26.4486 28.9648 26.2671 29.3263 26.04 29.6912C24.9781 31.1012 23.7475 31.8838 21.9494 32H10.0438C8.25439 31.8888 6.99626 31.0875 5.94814 29.6887C5.73897 29.3492 5.56231 29 5.41814 28.6413C5.40501 28.6081 5.38876 28.5981 5.35814 28.5831C5.36522 28.5823 5.37147 28.5806 5.37689 28.5781C5.39064 28.5715 5.39501 28.5608 5.39001 28.5462C5.20293 27.9954 5.10939 27.506 5.10939 27.0781C5.10939 24.831 5.10939 22.584 5.10939 20.3369C5.10939 20.3181 5.10043 20.3054 5.08251 20.2987L5.06189 20.2913C5.06689 20.2863 5.0746 20.2825 5.08501 20.28C5.09876 20.2767 5.10564 20.2677 5.10564 20.2531L5.10814 19.3088C5.10939 17.3575 5.10981 15.4056 5.10939 13.4531C5.10939 12.8873 5.11981 12.4708 5.14064 12.2037C5.41376 8.725 7.40751 5.67188 10.4381 3.95C10.4569 3.93917 10.4665 3.92292 10.4669 3.90125C10.4711 3.30417 10.4715 2.71167 10.4681 2.12375C10.4613 0.946875 11.3281 0.129375 12.4563 0ZM15.0006 2.64937C17.0169 2.55625 18.7181 2.695 20.5256 3.44563C20.5298 3.4474 20.5342 3.44811 20.5387 3.4477C20.5432 3.4473 20.5474 3.44579 20.5512 3.4433C20.5549 3.44082 20.5579 3.43744 20.56 3.43348C20.5621 3.42952 20.5632 3.4251 20.5631 3.42062C20.5613 2.89875 20.6413 2.12375 20.4756 1.68813C20.2506 1.09438 19.7606 0.968125 19.1431 0.96875C17.0311 0.96875 14.9188 0.96875 12.8063 0.96875C11.1594 0.969375 11.4344 2.29062 11.4381 3.4225C11.4381 3.44583 11.4488 3.45292 11.47 3.44375C12.5988 2.97042 13.7756 2.70563 15.0006 2.64937ZM10.3131 31.0413H21.6906C22.817 31.0413 23.8972 30.5938 24.6936 29.7974C25.4901 29.0009 25.9375 27.9207 25.9375 26.7944V13.1838C25.9375 11.9245 25.6946 10.6777 25.2227 9.51429C24.7508 8.35093 24.0591 7.29388 23.1871 6.40348C21.426 4.60524 19.0374 3.595 16.5469 3.595H15.4569C12.9663 3.595 10.5778 4.60524 8.81671 6.40348C7.05563 8.20172 6.06626 10.6407 6.06626 13.1838V26.7944C6.06626 27.9207 6.5137 29.0009 7.31015 29.7974C8.10659 30.5938 9.1868 31.0413 10.3131 31.0413Z" fill="#794AFF"/>
                        <path d="M8.81375 15.2825C8.74726 15.2825 8.68143 15.2694 8.62001 15.244C8.55859 15.2185 8.50278 15.1812 8.45577 15.1342C8.40876 15.0872 8.37147 15.0314 8.34603 14.97C8.32059 14.9086 8.3075 14.8427 8.3075 14.7763V13.0181C8.3075 11.0597 9.08542 9.18143 10.4701 7.79659C11.8549 6.41175 13.733 5.63376 15.6912 5.63376H16.3125C18.2708 5.63376 20.1489 6.41175 21.5336 7.79659C22.9183 9.18143 23.6962 11.0597 23.6962 13.0181V14.7763C23.6962 14.9105 23.6429 15.0393 23.548 15.1342C23.453 15.2292 23.3243 15.2825 23.19 15.2825H8.81375ZM9.31187 14.325L22.6856 14.3013C22.6969 14.3013 22.7077 14.2968 22.7157 14.2888C22.7236 14.2808 22.7281 14.27 22.7281 14.2588L22.7256 13.02C22.7241 12.1756 22.5564 11.3398 22.232 10.5602C21.9076 9.78065 21.4329 9.07264 20.8349 8.47661C20.237 7.88057 19.5275 7.40818 18.747 7.08641C17.9666 6.76463 17.1304 6.59978 16.2862 6.60126L15.6837 6.60251C14.8396 6.60398 14.004 6.77176 13.2247 7.09626C12.4453 7.42077 11.7375 7.89564 11.1417 8.49376C10.5458 9.09189 10.0736 9.80156 9.75187 10.5822C9.4302 11.3629 9.26539 12.1994 9.26687 13.0438L9.26937 14.2825C9.26937 14.2938 9.27385 14.3046 9.28182 14.3126C9.28979 14.3205 9.3006 14.325 9.31187 14.325Z" fill="#794AFF"/>
                        <path d="M18.3094 12.0013C15.8498 11.9983 13.3906 11.9981 10.9319 12.0006C10.7169 12.0006 10.5623 11.9727 10.4681 11.9169C10.1887 11.7513 10.195 11.2519 10.4987 11.0931C10.5779 11.0519 10.6998 11.0313 10.8644 11.0313C14.2881 11.0325 17.7125 11.0238 21.1369 11.0331C21.945 11.035 21.9244 11.9988 21.17 11.9994C20.5616 11.9998 19.9535 12 19.3456 12C19.3239 12 19.3131 12.0108 19.3131 12.0325C19.3119 12.3144 19.3694 12.8319 19.2656 13.0788C19.1044 13.4644 18.5506 13.4669 18.385 13.0794C18.2856 12.8475 18.345 12.3025 18.3425 12.0344C18.3425 12.0123 18.3314 12.0013 18.3094 12.0013Z" fill="#794AFF"/>
                        <path d="M5.10815 19.3087L5.10565 20.2531C5.10565 20.2677 5.09877 20.2767 5.08502 20.28C5.07461 20.2825 5.0669 20.2862 5.0619 20.2912C4.69815 20.3333 4.46357 20.3652 4.35815 20.3869C3.73627 20.5156 3.2544 21.0944 3.28627 21.7469C3.29544 21.9352 3.29981 22.0315 3.2994 22.0356C3.2894 23.2727 3.28773 24.5096 3.2944 25.7462C3.30127 27.06 4.12252 28.1662 5.35815 28.5831C5.38877 28.5981 5.40502 28.6081 5.41815 28.6412C5.56231 29 5.73898 29.3492 5.94815 29.6887C4.12127 29.4994 2.64127 28.1625 2.36315 26.3537C2.32815 26.125 2.3119 25.7092 2.3144 25.1062C2.31856 24.2067 2.32231 23.3073 2.32565 22.4081C2.32815 21.7698 2.33627 21.4073 2.35002 21.3206C2.5019 20.3519 3.2794 19.6081 4.2394 19.4281C4.3769 19.4027 4.66648 19.3629 5.10815 19.3087Z" fill="#794AFF"/>
                        <path d="M26.9062 19.3112C27.4006 19.3619 27.9562 19.4144 28.3837 19.6262C29.29 20.0762 29.6881 20.8794 29.6875 21.8737C29.6862 23.0046 29.6869 24.1352 29.6894 25.2656C29.6906 25.8356 29.6656 26.2508 29.6144 26.5112C29.2737 28.2531 27.8175 29.5144 26.04 29.6912C26.2671 29.3262 26.4485 28.9648 26.5844 28.6069C27.6687 28.2244 28.6612 27.2419 28.6975 26.0469C28.74 24.65 28.6687 23.2494 28.7231 21.8562C28.7469 21.2492 28.5056 20.8046 27.9994 20.5225C27.6875 20.3487 27.2475 20.3275 26.8762 20.2794L26.8787 19.3419C26.8787 19.3323 26.8829 19.325 26.8912 19.32L26.9062 19.3112Z" fill="#794AFF"/>
                        <path d="M23.6875 27.7806C23.6875 28.0957 23.5623 28.3979 23.3395 28.6208C23.1167 28.8436 22.8145 28.9688 22.4994 28.9688H9.49562C9.33959 28.9688 9.18509 28.938 9.04094 28.8783C8.89679 28.8186 8.76582 28.7311 8.65549 28.6208C8.54516 28.5104 8.45764 28.3795 8.39794 28.2353C8.33823 28.0912 8.3075 27.9367 8.3075 27.7806V22.4706C8.3075 22.3146 8.33823 22.1601 8.39794 22.016C8.45764 21.8718 8.54516 21.7408 8.65549 21.6305C8.76582 21.5202 8.89679 21.4327 9.04094 21.3729C9.18509 21.3132 9.33959 21.2825 9.49562 21.2825H22.4994C22.8145 21.2825 23.1167 21.4077 23.3395 21.6305C23.5623 21.8533 23.6875 22.1555 23.6875 22.4706V27.7806ZM22.7187 22.4731C22.7187 22.414 22.6952 22.3572 22.6534 22.3154C22.6115 22.2735 22.5548 22.25 22.4956 22.25H9.50437C9.44519 22.25 9.38844 22.2735 9.3466 22.3154C9.30475 22.3572 9.28125 22.414 9.28125 22.4731V27.7769C9.28125 27.8361 9.30475 27.8928 9.3466 27.9346C9.38844 27.9765 9.44519 28 9.50437 28H22.4956C22.5548 28 22.6115 27.9765 22.6534 27.9346C22.6952 27.8928 22.7187 27.8361 22.7187 27.7769V22.4731Z" fill="#794AFF"/>
                        <path d="M12.5181 25.6631C12.54 25.9306 12.59 26.5556 12.4343 26.7875C12.2512 27.0594 11.8006 27.0481 11.6406 26.7806C11.4943 26.5375 11.5643 25.9425 11.5612 25.6456C11.5608 25.6223 11.5489 25.6106 11.5256 25.6106C11.2693 25.6081 10.7206 25.6681 10.5081 25.55C10.1675 25.3612 10.1862 24.8531 10.5325 24.7006C10.6221 24.661 10.7829 24.6412 11.015 24.6412C14.3846 24.64 17.7546 24.6402 21.125 24.6419C21.9287 24.6419 21.94 25.6087 21.1912 25.6087C18.3291 25.6096 15.4548 25.6098 12.5681 25.6094C12.5612 25.6094 12.5544 25.6108 12.5481 25.6135C12.5417 25.6162 12.536 25.6203 12.5313 25.6253C12.5266 25.6304 12.523 25.6363 12.5208 25.6428C12.5185 25.6493 12.5176 25.6562 12.5181 25.6631Z" fill="#794AFF"/>
                    </svg>
                    <div className="model-label">
                        School classes
                    </div>
                </div>
                <div className="model-row">
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                        <path d="M1.84722 15.8606C0.977099 14.926 1.02479 13.9792 1.02931 12.7585C1.03102 12.3786 1.06132 12.1165 1.12018 11.9722C1.45276 11.1594 2.68124 11.1613 3.01382 11.9973C3.34511 12.8287 2.63677 14.2229 3.67511 14.6895C4.03733 14.8519 4.707 14.7765 5.12272 14.781C5.14464 14.781 5.15559 14.7701 5.15559 14.7482C5.15645 12.4811 5.15688 10.2143 5.15688 7.94771C5.15688 7.39298 5.18395 6.96523 5.23809 6.66444C5.63384 4.47239 7.40179 2.74892 9.62542 2.45243C9.87077 2.41978 10.2998 2.40323 10.9125 2.4028C14.8107 2.39894 18.7088 2.39829 22.6069 2.40087C25.2211 2.4028 27.3906 4.23585 27.7819 6.81913C27.8244 7.098 27.8455 7.52661 27.845 8.10497C27.8433 10.3174 27.8431 12.5282 27.8444 14.7372C27.8444 14.743 27.8455 14.7487 27.8477 14.754C27.85 14.7594 27.8532 14.7642 27.8573 14.7682C27.8614 14.7722 27.8662 14.7754 27.8715 14.7775C27.8768 14.7796 27.8825 14.7806 27.8882 14.7804C28.311 14.7726 28.9517 14.8468 29.3113 14.6953C30.3767 14.2461 29.6368 12.7849 30.0016 11.9573C30.3542 11.1581 31.5614 11.1671 31.8888 11.9967C31.9391 12.1247 31.9657 12.3288 31.9687 12.609C31.9758 13.2619 32.0145 14.0289 31.8566 14.607C31.5627 15.6859 30.6719 16.5361 29.5717 16.772C29.0883 16.8751 28.4399 16.8384 27.8824 16.839C27.8575 16.839 27.845 16.8515 27.845 16.8764C27.842 18.5844 27.842 20.2903 27.845 21.994C27.8482 24.1235 26.5611 25.9346 24.6243 26.7783C24.6041 26.7874 24.5936 26.8028 24.5927 26.8247C24.585 27.0374 24.5831 27.2484 24.5869 27.4577C24.6185 29.2153 23.254 30.6023 21.4912 30.5901C19.8767 30.5791 18.5496 29.4196 18.4233 27.7954C18.4069 27.5874 18.3992 27.3883 18.4001 27.1979C18.4001 27.1917 18.3988 27.1856 18.3965 27.1799C18.3941 27.1742 18.3907 27.169 18.3863 27.1646C18.3819 27.1603 18.3767 27.1568 18.371 27.1544C18.3653 27.1521 18.3592 27.1509 18.353 27.1509H14.6315C14.6233 27.1509 14.6154 27.1541 14.6096 27.1599C14.6038 27.1657 14.6006 27.1736 14.6006 27.1818C14.6025 27.8315 14.5432 28.3897 14.2409 28.9697C12.8996 31.5382 8.89194 30.933 8.44786 28.0171C8.39436 27.6691 8.40983 27.2166 8.41112 26.8196C8.41112 26.7964 8.40038 26.7803 8.3789 26.7712C6.70569 26.0809 5.54683 24.6288 5.23616 22.8725C5.18331 22.5751 5.15688 22.1472 5.15688 21.5886C5.15602 20.0163 5.15581 18.4448 5.15624 16.8738C5.15624 16.8651 5.15278 16.8567 5.14661 16.8506C5.14045 16.8444 5.13209 16.8409 5.12337 16.8409C4.75255 16.8388 4.37743 16.8328 3.99802 16.8229C3.14079 16.8001 2.42386 16.4794 1.84722 15.8606ZM7.31735 22.7635C7.58677 23.8186 8.4311 24.6894 9.48878 24.9749C9.71565 25.0359 10.0534 25.0675 10.502 25.0697C14.5127 25.0882 18.5232 25.0879 22.5334 25.069C22.9584 25.0669 23.2835 25.0357 23.5086 24.9756C24.8815 24.6095 25.7703 23.3617 25.7722 21.9463C25.7787 17.3233 25.7815 12.7003 25.7806 8.07726C25.7802 7.48042 25.7477 7.05353 25.6833 6.79657C25.4016 5.67831 24.4741 4.78692 23.3546 4.54394C23.1144 4.49151 22.6866 4.46509 22.0713 4.46466C18.3515 4.46208 14.6317 4.46208 10.9119 4.46466C10.2957 4.46509 9.86819 4.49194 9.62929 4.54522C8.18167 4.86942 7.22132 6.15655 7.22067 7.63769C7.21852 12.2581 7.21831 16.8783 7.22003 21.4983C7.22003 22.0879 7.25247 22.5096 7.31735 22.7635ZM12.5058 27.1689L10.4962 27.165C10.4892 27.165 10.4825 27.1678 10.4775 27.1728C10.4725 27.1777 10.4698 27.1845 10.4698 27.1915L10.4691 27.5324C10.4688 27.6623 10.4933 27.7909 10.541 27.911C10.5887 28.031 10.6587 28.1402 10.7471 28.2321C10.8355 28.3241 10.9405 28.3972 11.0562 28.4471C11.1718 28.497 11.2958 28.5228 11.4211 28.5231H11.5758C11.8288 28.5236 12.0716 28.4199 12.2508 28.2348C12.4301 28.0498 12.5311 27.7985 12.5316 27.5363L12.5323 27.1953C12.5323 27.1883 12.5295 27.1816 12.5245 27.1767C12.5196 27.1717 12.5128 27.1689 12.5058 27.1689ZM22.4986 27.1683L20.4941 27.1644C20.4858 27.1644 20.4777 27.1677 20.4718 27.1737C20.4659 27.1796 20.4626 27.1876 20.4626 27.196L20.4619 27.5292C20.4617 27.6611 20.4874 27.7917 20.5376 27.9136C20.5879 28.0356 20.6616 28.1464 20.7547 28.2398C20.8477 28.3333 20.9583 28.4074 21.08 28.4581C21.2018 28.5088 21.3323 28.5351 21.4642 28.5353H21.5235C21.6553 28.5356 21.786 28.5099 21.9079 28.4596C22.0298 28.4094 22.1407 28.3356 22.2341 28.2426C22.3275 28.1495 22.4017 28.0389 22.4524 27.9172C22.5031 27.7955 22.5293 27.6649 22.5296 27.5331L22.5302 27.1999C22.5302 27.1915 22.5269 27.1834 22.521 27.1775C22.515 27.1716 22.507 27.1683 22.4986 27.1683Z" fill="#FF3434"/>
                        <path d="M23.7181 13.9528C23.7181 14.3613 23.6377 14.7658 23.4814 15.1431C23.325 15.5205 23.0959 15.8634 22.8071 16.1523C22.5183 16.4411 22.1754 16.6702 21.798 16.8265C21.4206 16.9829 21.0161 17.0633 20.6076 17.0633H12.3924C11.984 17.0633 11.5795 16.9829 11.2021 16.8265C10.8247 16.6702 10.4818 16.4411 10.193 16.1523C9.90413 15.8634 9.67501 15.5205 9.5187 15.1431C9.36238 14.7658 9.28192 14.3613 9.28192 13.9528V9.86261C9.28192 9.03766 9.60963 8.24649 10.193 7.66315C10.7763 7.07982 11.5675 6.75211 12.3924 6.75211H20.6076C21.4326 6.75211 22.2238 7.07982 22.8071 7.66315C23.3904 8.24649 23.7181 9.03766 23.7181 9.86261V13.9528ZM21.6563 9.8581C21.6563 9.58118 21.5463 9.3156 21.3505 9.11978C21.1546 8.92397 20.8891 8.81396 20.6121 8.81396H12.3879C12.111 8.81396 11.8454 8.92397 11.6496 9.11978C11.4538 9.3156 11.3438 9.58118 11.3438 9.8581V13.9573C11.3438 14.2342 11.4538 14.4998 11.6496 14.6956C11.8454 14.8915 12.111 15.0015 12.3879 15.0015H20.6121C20.8891 15.0015 21.1546 14.8915 21.3505 14.6956C21.5463 14.4998 21.6563 14.2342 21.6563 13.9573V9.8581Z" fill="#FAA302"/>
                        <path d="M17.9412 19.9682H15.0588C14.516 19.9682 14.0759 20.4083 14.0759 20.9511V21.0362C14.0759 21.5791 14.516 22.0191 15.0588 22.0191H17.9412C18.484 22.0191 18.9241 21.5791 18.9241 21.0362V20.9511C18.9241 20.4083 18.484 19.9682 17.9412 19.9682Z" fill="#FF3434"/>
                        <path d="M11.3618 22.0617C11.9292 22.0617 12.3892 21.6017 12.3892 21.0343C12.3892 20.4669 11.9292 20.0069 11.3618 20.0069C10.7944 20.0069 10.3344 20.4669 10.3344 21.0343C10.3344 21.6017 10.7944 22.0617 11.3618 22.0617Z" fill="#FAA302"/>
                        <path d="M21.6369 22.1487C22.2043 22.1487 22.6643 21.6887 22.6643 21.1213C22.6643 20.5539 22.2043 20.0939 21.6369 20.0939C21.0695 20.0939 20.6096 20.5539 20.6096 21.1213C20.6096 21.6887 21.0695 22.1487 21.6369 22.1487Z" fill="#FF3434"/>
                    </svg>
                    <div className="model-label">
                        Learning with AI
                    </div>
                </div>
                <div className="model-row">
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                        <path d="M1.28971 6.55811C1.29035 3.98321 3.18527 1.81823 5.69766 1.37028C6.00188 1.31614 6.43006 1.28907 6.98221 1.28907C13.2913 1.28993 19.6008 1.2895 25.9108 1.28778C26.4728 1.28778 26.9012 1.31077 27.196 1.35675C29.4609 1.7093 31.2733 3.45147 31.6413 5.74471C31.6869 6.0296 31.7097 6.458 31.7097 7.02991C31.7109 13.3128 31.7114 19.5957 31.7109 25.8786C31.7109 26.463 31.6912 26.8914 31.6516 27.1638C31.3088 29.5337 29.4042 31.3964 27.02 31.6716C26.7897 31.6983 26.3607 31.7114 25.7329 31.7109C19.5506 31.7105 13.3682 31.7107 7.18588 31.7116C6.58818 31.7116 6.15957 31.6944 5.90004 31.66C3.601 31.3565 1.7499 29.5814 1.36318 27.2875C1.31463 26.9992 1.29035 26.5708 1.29035 26.0023C1.28863 19.5209 1.28842 13.0395 1.28971 6.55811ZM5.82463 2.92425C4.12178 3.28583 2.83658 4.80112 2.83658 6.57423C2.83529 13.0466 2.83551 19.519 2.83723 25.9914C2.83723 26.547 2.86795 26.9603 2.9294 27.2315C3.25295 28.661 4.41182 29.7896 5.83881 30.0816C6.1065 30.1366 6.53426 30.1641 7.12207 30.1641C13.4157 30.1645 19.7096 30.1643 26.0036 30.1634C26.5222 30.1634 26.9169 30.1336 27.1876 30.0738C28.944 29.6871 30.1641 28.1609 30.1641 26.3613C30.1641 19.9856 30.1641 13.6101 30.1641 7.23487C30.1641 6.61011 30.1441 6.18149 30.1041 5.94903C29.8444 4.43696 28.6462 3.21235 27.1464 2.91393C26.8851 2.86194 26.4569 2.83594 25.8618 2.83594C19.6094 2.83594 13.3575 2.83594 7.10596 2.83594C6.52889 2.83594 6.10178 2.86538 5.82463 2.92425Z" fill="#FF0000"/>
                        <path d="M18.683 19.3894C17.9392 21.4287 15.0318 21.4448 14.308 19.3791C14.2388 19.1815 14.1818 18.8018 14.1372 18.2402C13.9279 15.5912 13.718 12.9426 13.5075 10.2944C13.4602 9.70104 13.4535 9.27243 13.4875 9.0086C13.6048 8.10841 14.0325 7.40393 14.7707 6.89518C16.6508 5.59968 19.2528 6.75274 19.5254 9.02278C19.5512 9.23462 19.5439 9.60007 19.5035 10.1191C19.2857 12.9108 19.0652 15.7023 18.8422 18.4935C18.8109 18.8854 18.7578 19.184 18.683 19.3894ZM15.7105 18.5167C15.7988 19.6292 17.1916 19.6157 17.2734 18.5947C17.5068 15.6647 17.7377 12.7344 17.9663 9.80395C17.9951 9.437 17.9854 9.16501 17.9373 8.98798C17.7498 8.29317 17.044 7.83813 16.3395 7.9129C15.452 8.00764 14.9396 8.7495 15.0086 9.63122C15.241 12.5935 15.475 15.5553 15.7105 18.5167Z" fill="#FDB515"/>
                        <path d="M18.7056 24.4342C18.7056 24.7239 18.6485 25.0108 18.5377 25.2785C18.4268 25.5461 18.2643 25.7894 18.0594 25.9942C17.8546 26.1991 17.6113 26.3616 17.3437 26.4725C17.076 26.5833 16.7891 26.6404 16.4994 26.6404C15.9143 26.6404 15.3531 26.408 14.9393 25.9942C14.5256 25.5805 14.2932 25.0193 14.2932 24.4342C14.2932 23.8491 14.5256 23.2879 14.9393 22.8741C15.3531 22.4604 15.9143 22.228 16.4994 22.228C16.7891 22.228 17.076 22.285 17.3437 22.3959C17.6113 22.5068 17.8546 22.6693 18.0594 22.8741C18.2643 23.079 18.4268 23.3222 18.5377 23.5899C18.6485 23.8576 18.7056 24.1445 18.7056 24.4342ZM17.1607 24.44C17.1607 24.2646 17.091 24.0964 16.967 23.9724C16.843 23.8484 16.6748 23.7787 16.4994 23.7787C16.324 23.7787 16.1558 23.8484 16.0318 23.9724C15.9078 24.0964 15.8381 24.2646 15.8381 24.44C15.8381 24.6154 15.9078 24.7836 16.0318 24.9076C16.1558 25.0316 16.324 25.1013 16.4994 25.1013C16.6748 25.1013 16.843 25.0316 16.967 24.9076C17.091 24.7836 17.1607 24.6154 17.1607 24.44Z" fill="#FDB515"/>
                    </svg>
                    <div className="model-label">
                        Exam preparation
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Schedule;
