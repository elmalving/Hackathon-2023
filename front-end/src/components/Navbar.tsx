import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import { Link } from 'react-router-dom';
import { User } from '../types.js'
import '../css/style.css'

const Navbar = () => {
    const [user, setUser] = useState<User>({'id': 'Unauthorized', 'email': 'Unauthorized'});

    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get('//localhost:5000/@me');
                
                setUser(response.data);
            } catch (error) {
                
            }
        })();
    }, []);

    return (
        <div className='sidebar layout'>
            <div className="workspace ">
                <img src='../../public/logo.svg' className="logo"/>
                <div className='study-mate'>StudyMate</div>
                <div className="close-tab-1">
                    <button type='button'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                            <path d="M15.4383 3.3997L15.4249 3.38623C15.4174 3.37874 15.4085 3.37515 15.3984 3.37544L13.2062 3.38667" stroke="#686B6E" strokeWidth="2"/>
                            <path d="M13.2332 20.6106L15.3827 20.6245C15.3958 20.6248 15.408 20.6214 15.4191 20.6142L15.4388 20.6016" stroke="#686B6E" strokeWidth="2"/>
                            <path d="M1.51437 3.53495C1.70753 2.7879 2.32835 2.18684 3.0745 2.00356C3.25239 1.95984 3.54978 1.93798 3.96665 1.93798C8.95597 1.93738 13.9453 1.93723 18.9346 1.93753C19.3725 1.93753 19.6707 1.95295 19.8295 1.9838C20.6466 2.14192 21.3227 2.79374 21.5068 3.61446C21.5437 3.77768 21.5621 4.04826 21.5621 4.4262C21.5627 9.57515 21.5624 14.7239 21.5612 19.8726C21.5612 20.8856 20.8982 21.758 19.9094 21.9969C19.7282 22.0407 19.4415 22.0625 19.0492 22.0625C13.9161 22.0625 8.78303 22.0612 3.64995 22.0585C2.63786 22.058 1.75021 21.4228 1.50583 20.4368C1.46241 20.2613 1.44039 19.9638 1.4398 19.5442C1.43321 14.498 1.435 9.45176 1.44519 4.40554C1.44608 4.00064 1.46914 3.71044 1.51437 3.53495ZM15.4384 3.39973L15.4249 3.38626C15.4174 3.37877 15.4086 3.37518 15.3984 3.37548L13.2062 3.38671C13.1696 3.3939 13.1264 3.39404 13.0764 3.38716C13.0204 3.37937 12.9778 3.37548 12.9488 3.37548C9.87792 3.37488 6.80676 3.37488 3.7353 3.37548C3.10505 3.37548 2.87505 3.67286 2.87505 4.27886C2.87505 9.4284 2.87505 14.5781 2.87505 19.7279C2.87505 20.3618 3.13739 20.625 3.77169 20.625C6.83267 20.625 9.89364 20.6249 12.9546 20.6246C12.9879 20.6246 13.034 20.6198 13.093 20.6102C13.1502 20.6012 13.1969 20.6014 13.2331 20.6107L15.3826 20.6246C15.3958 20.6249 15.408 20.6214 15.419 20.6142L15.4388 20.6017C15.44 20.605 15.4412 20.6089 15.4424 20.6133C15.4432 20.6167 15.4451 20.6196 15.4478 20.6218C15.4505 20.6239 15.4538 20.625 15.4572 20.625C16.706 20.6247 17.9549 20.6249 19.2037 20.6255C19.8726 20.6255 20.1251 20.3699 20.1251 19.7023C20.1251 14.5447 20.1251 9.38707 20.1251 4.22944C20.1251 3.61581 19.8214 3.37413 19.2298 3.37458C17.9696 3.37578 16.7098 3.37653 15.4505 3.37682C15.4448 3.37682 15.4407 3.38446 15.4384 3.39973Z" fill="#686B6E"/>
                            <path d="M15.4383 3.3997C15.7506 3.96212 15.8121 4.43695 15.8121 5.14043C15.8127 9.82278 15.8128 14.5051 15.8125 19.1875C15.8122 19.6819 15.6877 20.1533 15.4388 20.6016L15.419 20.6142C15.4079 20.6214 15.3958 20.6248 15.3826 20.6245L13.2331 20.6106C13.8051 20.4303 14.1644 20.0919 14.3108 19.5954C14.3539 19.4489 14.3755 19.2197 14.3755 18.9076C14.3749 14.2963 14.3747 9.68487 14.375 5.07349C14.375 4.77461 14.3539 4.55255 14.3117 4.4073C14.162 3.89579 13.7935 3.55558 13.2062 3.38667L15.3984 3.37544C15.4085 3.37515 15.4174 3.37874 15.4249 3.38623L15.4383 3.3997Z" fill="#686B6E"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className='general nav-item-border'>
                <div className="heading">General</div>
                <div className="list">
                    <div className="chat-1">
                        <div className="search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                                <g filter="url(#filter0_dd_474_6369)">
                                    <path d="M21 18.5C25.1421 18.5 28.5 15.1421 28.5 11C28.5 6.85786 25.1421 3.5 21 3.5C16.8579 3.5 13.5 6.85786 13.5 11V18.5H21Z" stroke="#686B6E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <defs>
                                    <filter id="filter0_dd_474_6369" x="-1" y="-1" width="44" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect1_dropShadow_474_6369"/>
                                        <feOffset dy="4"/>
                                        <feGaussianBlur stdDeviation="3"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.407843 0 0 0 0 0.419608 0 0 0 0 0.431373 0 0 0 0.16 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_474_6369"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feMorphology radius="3" operator="erode" in="SourceAlpha" result="effect2_dropShadow_474_6369"/>
                                        <feOffset dy="10"/>
                                        <feGaussianBlur stdDeviation="7.5"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.407843 0 0 0 0 0.419608 0 0 0 0 0.431373 0 0 0 0.16 0"/>
                                        <feBlend mode="normal" in2="effect1_dropShadow_474_6369" result="effect2_dropShadow_474_6369"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_474_6369" result="shape"/>
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                            <div className="navbar-link">
                        <Link to={'/'}>Chat</Link>
                    </div>
                    </div>
                    <div className="schedule">
                        <div className="label">
                            <div className="calendar">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                    <g clipPath="url(#clip0_474_6374)">
                                        <path d="M11.4387 0.5H11.3435C10.7362 0.601953 10.8352 1.13428 10.8323 1.59893C10.8322 1.60276 10.8306 1.60641 10.8279 1.60909C10.8251 1.61178 10.8214 1.61328 10.8176 1.61328H4.18801C4.17512 1.61328 4.16858 1.60684 4.16838 1.59395C4.16194 1.13838 4.2677 0.598145 3.65305 0.5H3.55813C2.96135 0.603418 3.05071 1.15684 3.05452 1.5957C3.05471 1.60703 3.04915 1.6127 3.03782 1.6127C2.68333 1.61475 2.25793 1.59072 1.95764 1.63643C1.11184 1.76562 0.438599 2.44385 0.305591 3.28467C0.287427 3.39951 0.278345 3.59424 0.278345 3.86885C0.27815 7.01768 0.278248 10.1665 0.278638 13.3153C0.278638 13.5769 0.291333 13.7715 0.316724 13.8992C0.496314 14.8057 1.26272 15.4411 2.18469 15.5H12.8262C13.7408 15.4385 14.4955 14.8062 14.6804 13.9121C14.7077 13.7805 14.7214 13.5868 14.7214 13.3312C14.7218 10.1554 14.7219 6.97949 14.7217 3.80352C14.7217 3.54551 14.7089 3.35098 14.6833 3.21992C14.5283 2.42598 13.8938 1.78701 13.0899 1.64375C12.7743 1.5875 12.3328 1.61475 11.964 1.6127C11.9594 1.61262 11.9551 1.61077 11.9519 1.60755C11.9486 1.60432 11.9468 1.59997 11.9467 1.59541C11.9406 1.14131 12.046 0.606641 11.4387 0.5ZM11.0754 3.73613C11.473 3.99102 11.9482 3.70684 11.9449 3.24658C11.9438 3.07822 11.9446 2.90879 11.9473 2.73828C11.9475 2.72773 11.9528 2.72246 11.9631 2.72246C12.1983 2.7207 12.4332 2.721 12.668 2.72334C13.2633 2.72979 13.6116 3.10127 13.6096 3.69102C13.6074 4.19805 13.6074 4.70352 13.6096 5.20742C13.6096 5.21185 13.6079 5.2161 13.6048 5.21923C13.6017 5.22236 13.5975 5.22412 13.5932 5.22412H1.4136C1.40746 5.22412 1.40157 5.22168 1.39723 5.21734C1.39289 5.213 1.39045 5.20712 1.39045 5.20098C1.39221 4.69961 1.39241 4.19717 1.39104 3.69365C1.38928 3.11416 1.7303 2.72275 2.32678 2.72598C2.55432 2.72715 2.79251 2.72646 3.04133 2.72393C3.04301 2.72389 3.04468 2.72419 3.04624 2.72482C3.0478 2.72545 3.04923 2.7264 3.05043 2.7276C3.05163 2.7288 3.05258 2.73023 3.05324 2.73181C3.05389 2.7334 3.05422 2.7351 3.05422 2.73682C3.05364 2.9665 3.02493 3.2917 3.09612 3.47715C3.31702 4.05547 4.15989 3.88408 4.16516 3.26094C4.16672 3.0832 4.1676 2.90742 4.1678 2.73359C4.16788 2.72976 4.16945 2.72611 4.17219 2.72342C4.17493 2.72074 4.17861 2.71924 4.18245 2.71924H10.8106C10.8135 2.71924 10.8164 2.71982 10.8192 2.72096C10.8219 2.7221 10.8243 2.72376 10.8264 2.72586C10.8285 2.72796 10.8301 2.73045 10.8312 2.73319C10.8323 2.73592 10.8329 2.73885 10.8328 2.7418C10.8311 3.06143 10.7567 3.53193 11.0754 3.73613ZM13.568 13.7771C13.4567 14.1219 13.1224 14.387 12.7515 14.3867C9.28254 14.3865 5.8136 14.3866 2.34465 14.387C1.90403 14.387 1.55833 14.1857 1.42942 13.753C1.40403 13.6677 1.39133 13.5515 1.39133 13.4044C1.39114 11.0544 1.39124 8.70361 1.39163 6.35205C1.39182 6.34229 1.3968 6.3374 1.40657 6.3374H13.5935C13.6032 6.3374 13.6081 6.34229 13.6081 6.35205C13.6091 8.70908 13.609 11.0651 13.6078 13.4202C13.6078 13.5759 13.5946 13.6948 13.568 13.7771Z" fill="#686B6E"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_474_6374">
                                            <rect width="15" height="15" fill="white" transform="matrix(-1 0 0 1 15 0.5)"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div className="navbar-link">
                            <Link to={'/schedule'}>Schedule</Link>
                        </div>
                        </div>
                    </div>
                    <div className="progress">
                        <div className="label">
                            <div className="bar-chart">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <g clipPath="url(#clip0_474_6379)">
                                        <path d="M15.3148 0H18.684C18.9695 0.0472656 19.0035 0.245703 19.0035 0.512891C19.004 6.43893 19.004 12.365 19.0035 18.291C19.0035 18.6043 18.784 18.6664 18.5055 18.668C17.4758 18.6742 16.4465 18.6743 15.4176 18.6684C15.0656 18.6664 15 18.4871 15 18.1645C15 12.2751 15 6.38594 15 0.496875C15 0.231641 15.034 0.0488281 15.3148 0ZM18.3305 0.683203C18.3305 0.678127 18.3285 0.673258 18.3249 0.669669C18.3213 0.666079 18.3164 0.664062 18.3113 0.664062H15.6832C15.6781 0.664062 15.6733 0.666079 15.6697 0.669669C15.6661 0.673258 15.6641 0.678127 15.6641 0.683203V17.9793C15.6641 17.9844 15.6661 17.9892 15.6697 17.9928C15.6733 17.9964 15.6781 17.9984 15.6832 17.9984H18.3113C18.3164 17.9984 18.3213 17.9964 18.3249 17.9928C18.3285 17.9892 18.3305 17.9844 18.3305 17.9793V0.683203Z" fill="#686B6E"/>
                                        <path d="M9.66797 18.3137C9.66797 18.4082 9.63039 18.499 9.56351 18.5658C9.49663 18.6327 9.40592 18.6703 9.31133 18.6703H6.0207C5.92612 18.6703 5.8354 18.6327 5.76852 18.5658C5.70164 18.499 5.66406 18.4082 5.66406 18.3137V4.35975C5.66406 4.26517 5.70164 4.17445 5.76852 4.10757C5.8354 4.04069 5.92612 4.00311 6.0207 4.00311H9.31133C9.40592 4.00311 9.49663 4.04069 9.56351 4.10757C9.63039 4.17445 9.66797 4.26517 9.66797 4.35975V18.3137ZM6.36953 4.66796C6.3651 4.66796 6.35339 4.67512 6.33438 4.68944C6.32188 4.69908 6.31992 4.71639 6.32852 4.74139C6.33477 4.7604 6.33789 4.77707 6.33789 4.79139C6.33789 9.17395 6.33776 13.5736 6.3375 17.9902C6.3375 17.9924 6.33836 17.9945 6.3399 17.996C6.34144 17.9976 6.34353 17.9984 6.3457 17.9984L8.97461 17.9976C8.97846 17.9976 8.98227 17.9969 8.98582 17.9954C8.98938 17.994 8.99261 17.9919 8.99533 17.9892C8.99805 17.9865 9.0002 17.9833 9.00168 17.9798C9.00315 17.9763 9.00391 17.9725 9.00391 17.9687V4.68749C9.00391 4.68231 9.00185 4.67734 8.99819 4.67368C8.99452 4.67001 8.98956 4.66796 8.98438 4.66796H6.36953Z" fill="#686B6E"/>
                                        <path d="M14.3359 18.3078C14.3359 18.3555 14.3266 18.4027 14.3083 18.4467C14.2901 18.4907 14.2633 18.5307 14.2296 18.5644C14.196 18.5981 14.1559 18.6248 14.1119 18.6431C14.0679 18.6613 14.0207 18.6707 13.973 18.6707H10.6949C10.6473 18.6707 10.6001 18.6613 10.556 18.6431C10.512 18.6248 10.472 18.5981 10.4383 18.5644C10.4046 18.5307 10.3779 18.4907 10.3597 18.4467C10.3414 18.4027 10.332 18.3555 10.332 18.3078V8.36094C10.332 8.26469 10.3703 8.17239 10.4383 8.10434C10.5064 8.03628 10.5987 7.99805 10.6949 7.99805H13.973C14.0207 7.99805 14.0679 8.00743 14.1119 8.02567C14.1559 8.04391 14.196 8.07064 14.2296 8.10434C14.2633 8.13803 14.2901 8.17804 14.3083 8.22207C14.3266 8.26609 14.3359 8.31328 14.3359 8.36094V18.3078ZM10.9992 8.7625C10.9971 8.76771 10.9961 8.77331 10.9961 8.7793C10.9961 11.8488 10.9961 14.9174 10.9961 17.9852C10.9961 17.9886 10.9975 17.9919 10.9999 17.9943C11.0023 17.9967 11.0056 17.998 11.009 17.998L13.6453 17.9984C13.6523 17.9984 13.659 17.9957 13.664 17.9907C13.6689 17.9857 13.6718 17.979 13.6719 17.9719C13.673 17.8703 13.6629 17.7617 13.6629 17.668C13.6608 14.6732 13.6615 11.679 13.6648 8.68555C13.6648 8.68151 13.6632 8.67763 13.6604 8.67477C13.6575 8.67192 13.6536 8.67031 13.6496 8.67031C12.7621 8.67292 11.8962 8.67266 11.052 8.66953C11.0309 8.66953 11.0158 8.67344 11.0066 8.68125C10.9918 8.69375 10.9892 8.71172 10.9988 8.73516C11.0025 8.74427 11.0026 8.75339 10.9992 8.7625Z" fill="#686B6E"/>
                                        <path d="M5.00037 18.3133C5.00037 18.408 4.96275 18.4988 4.89579 18.5658C4.82884 18.6327 4.73803 18.6703 4.64333 18.6703H1.35349C1.2588 18.6703 1.16799 18.6327 1.10103 18.5658C1.03408 18.4988 0.99646 18.408 0.99646 18.3133V12.3586C0.99646 12.2639 1.03408 12.1731 1.10103 12.1062C1.16799 12.0392 1.2588 12.0016 1.35349 12.0016H4.64333C4.73803 12.0016 4.82884 12.0392 4.89579 12.1062C4.96275 12.1731 5.00037 12.2639 5.00037 12.3586V18.3133ZM1.66951 17.9836C1.66951 17.9875 1.67103 17.9911 1.67374 17.9938C1.67645 17.9965 1.68013 17.9981 1.68396 17.9981L4.32146 17.9985C4.32529 17.9985 4.32897 17.9969 4.33168 17.9942C4.33439 17.9915 4.33591 17.9878 4.33591 17.984V12.6805C4.33591 12.6767 4.33439 12.673 4.33168 12.6703C4.32897 12.6676 4.32529 12.666 4.32146 12.666H1.68435C1.68052 12.666 1.67684 12.6676 1.67413 12.6703C1.67142 12.673 1.6699 12.6767 1.6699 12.6805L1.66951 17.9836Z" fill="#686B6E"/>
                                        <path d="M20 19.3359V20H0V19.3363L20 19.3359Z" fill="black"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_474_6379">
                                            <rect width="20" height="20" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div className="navbar-link">
                            <Link to={'/progress'}>Progress</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='subject'>
                <div className="heading">Subject</div>
                <div className="list">
                    <a href='#'>
                    <div className="math">
                        <div className="math-square">
                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                                <g filter="url(#filter0_dd_474_6392)">
                                    <rect x="13.5" y="3.5" width="15" height="15" rx="3" stroke="#B6F09C" strokeWidth="1.5" strokeLinecap="round"/>
                                </g>
                                <defs>
                                    <filter id="filter0_dd_474_6392" x="-1" y="-1" width="44" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect1_dropShadow_474_6392"/>
                                        <feOffset dy="4"/>
                                        <feGaussianBlur stdDeviation="3"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.713726 0 0 0 0 0.941176 0 0 0 0 0.611765 0 0 0 0.16 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_474_6392"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feMorphology radius="3" operator="erode" in="SourceAlpha" result="effect2_dropShadow_474_6392"/>
                                        <feOffset dy="10"/>
                                        <feGaussianBlur stdDeviation="7.5"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.713726 0 0 0 0 0.941176 0 0 0 0 0.611765 0 0 0 0.16 0"/>
                                        <feBlend mode="normal" in2="effect1_dropShadow_474_6392" result="effect2_dropShadow_474_6392"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_474_6392" result="shape"/>
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                        <div className="navbar-item">
                        Math
                        </div>
                    </div>
                    </a>
                    <div className="physics">
                        <a href='#'>
                        <div className="label">
                            <div className="triangle">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                                    <g filter="url(#filter0_dd_474_6398)">
                                        <path d="M15.9072 17.5H24.0929C26.3747 17.5 27.8212 15.0536 26.7215 13.0542L21.7525 4.01955C20.9926 2.638 19.0075 2.638 18.2476 4.01955L13.2785 13.0542C12.1789 15.0536 13.6254 17.5 15.9072 17.5Z" stroke="#D0302F" strokeWidth="1.5" strokeLinecap="round"/>
                                    </g>
                                <defs>
                                    <filter id="filter0_dd_474_6398" x="-2" y="-2" width="44" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect1_dropShadow_474_6398"/>
                                        <feOffset dy="4"/>
                                        <feGaussianBlur stdDeviation="3"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.741176 0 0 0 0 0.231373 0 0 0 0 0.227451 0 0 0 0.16 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_474_6398"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feMorphology radius="3" operator="erode" in="SourceAlpha" result="effect2_dropShadow_474_6398"/>
                                        <feOffset dy="10"/>
                                        <feGaussianBlur stdDeviation="7.5"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.741176 0 0 0 0 0.231373 0 0 0 0 0.227451 0 0 0 0.16 0"/>
                                        <feBlend mode="normal" in2="effect1_dropShadow_474_6398" result="effect2_dropShadow_474_6398"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_474_6398" result="shape"/>
                                    </filter>
                                </defs>
                                </svg>
                            </div>
                            <div className="navbar-item">
                            Physics
                            </div>
                        </div>
                        </a>
                    </div>
                    <a href='#'>
                    <div className="language">
                        <div className="square-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                                <g filter="url(#filter0_dd_474_6404)">
                                    <rect x="13.5" y="3.5" width="15" height="15" rx="3" stroke="#E26F20" strokeWidth="1.5" strokeLinecap="round"/>
                                </g>
                                <defs>
                                    <filter id="filter0_dd_474_6404" x="-1" y="-1" width="44" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect1_dropShadow_474_6404"/>
                                        <feOffset dy="4"/>
                                        <feGaussianBlur stdDeviation="3"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.886275 0 0 0 0 0.435294 0 0 0 0 0.12549 0 0 0 0.16 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_474_6404"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feMorphology radius="3" operator="erode" in="SourceAlpha" result="effect2_dropShadow_474_6404"/>
                                        <feOffset dy="10"/>
                                        <feGaussianBlur stdDeviation="7.5"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.886275 0 0 0 0 0.435294 0 0 0 0 0.12549 0 0 0 0.16 0"/>
                                        <feBlend mode="normal" in2="effect1_dropShadow_474_6404" result="effect2_dropShadow_474_6404"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_474_6404" result="shape"/>
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                        <div className="navbar-item">
                        Czech Language
                        </div>
                    </div>  
                    </a>
                    <div className="geography">
                        <a href='#'>
                        <div className="label">
                            <div className="octagon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                                    <g filter="url(#filter0_dd_474_6410)">
                                        <path d="M21 18.5H23.9216C24.452 18.5 24.9607 18.2893 25.3358 17.9142L27.9142 15.3358C28.2893 14.9607 28.5 14.452 28.5 13.9216V11V8.07843C28.5 7.54799 28.2893 7.03929 27.9142 6.66421L25.3358 4.08579C24.9607 3.71071 24.452 3.5 23.9216 3.5H21H18.0784C17.548 3.5 17.0393 3.71071 16.6642 4.08579L14.0858 6.66421C13.7107 7.03929 13.5 7.54799 13.5 8.07843V11V13.9216C13.5 14.452 13.7107 14.9607 14.0858 15.3358L16.6642 17.9142C17.0393 18.2893 17.548 18.5 18.0784 18.5H21Z" stroke="#82DBF7" strokeWidth="1.5" strokeLinecap="round"/>
                                    </g>
                                    <defs>
                                        <filter id="filter0_dd_474_6410" x="-1" y="-1" width="44" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect1_dropShadow_474_6410"/>
                                            <feOffset dy="4"/>
                                            <feGaussianBlur stdDeviation="3"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 0.509804 0 0 0 0 0.858824 0 0 0 0 0.968627 0 0 0 0.16 0"/>
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_474_6410"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feMorphology radius="3" operator="erode" in="SourceAlpha" result="effect2_dropShadow_474_6410"/>
                                            <feOffset dy="10"/>
                                            <feGaussianBlur stdDeviation="7.5"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 0.509804 0 0 0 0 0.858824 0 0 0 0 0.968627 0 0 0 0.16 0"/>
                                            <feBlend mode="normal" in2="effect1_dropShadow_474_6410" result="effect2_dropShadow_474_6410"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_474_6410" result="shape"/>
                                        </filter>
                                    </defs>
                                </svg>
                            </div>
                            <div className="navbar-item">
                            Geography</div>
                        </div>
                        </a>
                    </div>
                    <div className="new-subject">
                        <a href='#'>
                        <div className="label">
                            <div className="plus-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 6.66667V10M10 10V13.3333M10 10H13.3333M10 10H6.66667M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z" stroke="#363A3D" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <div className="navbar-item">
                            Add new subject</div>
                        </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className='footer'>
                <div className="user">
                    <div className="user-1">
                    <a href='#'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <path d="M46.4849 24.0066C46.4849 29.9737 44.1145 35.6964 39.8951 39.9158C35.6757 44.1352 29.953 46.5056 23.9859 46.5056C18.0188 46.5056 12.296 44.1352 8.07664 39.9158C3.85725 35.6964 1.48682 29.9737 1.48682 24.0066C1.48682 18.0394 3.85725 12.3167 8.07664 8.09732C12.296 3.87793 18.0188 1.5075 23.9859 1.5075C29.953 1.5075 35.6757 3.87793 39.8951 8.09732C44.1145 12.3167 46.4849 18.0394 46.4849 24.0066ZM43.3153 21.3647C42.2371 13.7409 36.9046 7.47656 29.4871 5.30156C20.6718 2.71687 11.2134 6.64031 6.85775 14.7103C3.40025 21.1172 3.78369 28.8534 7.84025 34.9087C7.84414 34.9145 7.84922 34.9193 7.85513 34.9228C7.86104 34.9264 7.86764 34.9286 7.87445 34.9293C7.88126 34.9301 7.88811 34.9293 7.89452 34.927C7.90093 34.9247 7.90673 34.9211 7.9115 34.9163C16.8243 25.905 31.169 25.9022 40.0668 34.8956C40.0747 34.9038 40.0842 34.9101 40.0949 34.914C40.1055 34.918 40.1169 34.9195 40.1281 34.9184C40.1394 34.9173 40.1503 34.9137 40.16 34.9078C40.1697 34.9019 40.1779 34.8939 40.184 34.8844C42.8184 30.8681 43.9884 26.1234 43.3153 21.3647Z" fill="#686B6E"/>
                            <path d="M24.0009 25.4925C28.9673 25.4925 32.9934 21.4664 32.9934 16.5C32.9934 11.5336 28.9673 7.5075 24.0009 7.5075C19.0345 7.5075 15.0084 11.5336 15.0084 16.5C15.0084 21.4664 19.0345 25.4925 24.0009 25.4925Z" fill="#686B6E"/>
                        </svg>
                        </a>
                        <div className="email">
                            {user.email}
                        </div>
                    </div>
                    <div className="cog">
                        <a href='#'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z" stroke="#686B6E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6.90136 6.74691C5.96492 6.20626 4.76749 6.52711 4.22684 7.46355L4.1851 7.53585C3.64424 8.47265 3.96521 9.67052 4.902 10.2114L5.1448 10.3516C5.71742 10.6822 6 11.3388 6 12C6 12.6612 5.71742 13.3179 5.1448 13.6485L4.902 13.7886C3.96521 14.3295 3.64424 15.5274 4.1851 16.4642L4.22684 16.5365C4.7675 17.4729 5.96492 17.7938 6.90136 17.2531L7.14546 17.1122C7.71803 16.7816 8.42331 16.863 8.9953 17.1946C9.56711 17.5261 10 18.1005 10 18.7614V19.0427C10 20.1237 10.8763 21 11.9573 21H12.0427C13.1237 21 14 20.1237 14 19.0427V18.7614C14 18.1005 14.4329 17.5261 15.0047 17.1946C15.5767 16.863 16.282 16.7816 16.8545 17.1122L17.0986 17.2531C18.0351 17.7938 19.2325 17.4729 19.7732 16.5365L19.8149 16.4642C20.3558 15.5274 20.0348 14.3295 19.098 13.7886L18.8552 13.6485C18.2826 13.3179 18 12.6612 18 12C18 11.3388 18.2826 10.6822 18.8552 10.3516L19.098 10.2114C20.0348 9.67052 20.3558 8.47263 19.8149 7.53583L19.7732 7.46355C19.2325 6.5271 18.0351 6.20625 17.0986 6.74691L16.8545 6.88784C16.282 7.21842 15.5767 7.137 15.0047 6.80543C14.4329 6.47397 14 5.89953 14 5.2386V4.95729C14 3.87632 13.1237 3.00002 12.0427 3.00002L11.9573 3.00002C10.8763 3.00002 10 3.87632 10 4.95729V5.2386C10 5.89953 9.56711 6.47397 8.9953 6.80543C8.42331 7.137 7.71803 7.21842 7.14546 6.88784L6.90136 6.74691Z" stroke="#686B6E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
