import React from "react";
import { useSelector } from "react-redux";
// import { searchLists } from "../redux/actions/searchListAction";

const GetSearchedPage = () => {
  const searchedTask = useSelector(state=>state.searchLists);
  console.log('searchedTask: ', searchedTask);
  const tasks = searchedTask.searchList.searchedList;
  return (
    <>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Task Title</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks ? (
            tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.status}</td>
              </tr>
            ))
          ) : (
            <div className="container text-center ">
              <h3 className="m-2">No such task available.</h3>
            </div>
          )}
        </tbody>
      </table>
    </>
  );
};

export default GetSearchedPage;
