import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navBar"; 
import { getAttemptList, getCompletedList } from "../../api/usersAPI/qnsHistAPI";
import { useSelector } from "react-redux";
import { State } from "../../state";
import { getSingleQuestion } from "../../api/questionAPI/getSingleQuestion";
import { Question } from "../../state/question";

//dummy page
const QnsHistPage = () => {
    interface resultProps {
        id: Number,
        date: String,
        time: String,
        question: Question
    }
    const userId = useSelector((state: State) => state.user.id);
    const token = useSelector((state: State) => state.token);
    let attemptList: resultProps[] = [];
    let completedList: resultProps[] = [];
    const dates: string[] = [];
    const dummy = [1,2,3,4];

    async function fetchQns(qid: String) {
        return await getSingleQuestion(token, qid);
    }

    useEffect(() => {
        async function getList() {
            const attempts = await getAttemptList(userId, token);
            const attemptedQns = await Promise.all(attempts.map(async item => {
                const question = await fetchQns(item.qid);
                return {
                    id: item.id,
                    date: item.date,
                    time: item.time,
                    question: question
                }
            }));
            attemptedQns.map(item => dates.push(item.date));
            console.log(dates);
            const completed = await getCompletedList(userId, token);
            const completedQns = await Promise.all(completed.map(async item => {
                const question = await fetchQns(item.qid);
                return {
                    id: item.id,
                    date: item.date,
                    time: item.time,
                    question: question
                }
            }));
            attemptList = attemptedQns;
            completedList = completedQns;
            console.log(attemptList[0].date);
            console.log(completedList);
        }
        getList();
    }, []); 


    return (
        <>
        <ul>
            {dates.map((item, index) => (
                <li key={index}>
                    {/* this part doesnt show up idk why */}
                    {/* question = {item.question.title}, date = {item.date}, time = {item.time}  */}
                    {item}
                </li>
            ))}
        </ul>
        </>
    );
}

export default QnsHistPage;