import React, { useState, useEffect } from "react";

const Home = () => {
  const [lists, setLists] = useState([]);
  const [toDo, setToDo] = useState("");
  const url = "https://assets.breatheco.de/apis/fake/todos/user/josev";

  const getAllTask = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLists(data)
      });
  };

  useEffect(() => {
    getAllTask();
  }, []);

  
  const updateTasks = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let agregar = lists.concat({
      "label": toDo,
      "done": false,
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(agregar),
      redirect: "follow",
    };

    fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/josev",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => getAllTask())
      .catch((error) => console.log("error", error));
  };


  const handleKey = (event) => {
    if (event.key === "Enter" && toDo.trim() !== "") {
      updateTasks();
      setToDo("");
    }
  };


  const deleteElement = (index) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");


		let eliminar = lists.filter((task, i) => i != index)

		var requestOptions = {
		  method: 'PUT',
		  headers: myHeaders,
		  body: JSON.stringify(eliminar),
		  redirect: 'follow'
		};

	   fetch("https://assets.breatheco.de/apis/fake/todos/user/josev", requestOptions)
		 .then(response => response.json())
		 .then(result => getAllTask())
		 .catch(error => console.log('error', error));
		   }

  return (
    <div className="List">
      <h1 className="List-h1">To do List</h1>
      <div>
        <input
          className="List-input"
          type="text"
          placeholder="What needs to be done?"
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          onKeyDown={handleKey}
        ></input>
        
        <ul>
          {lists.map((el, index) => 
            (
              <li className="List-li" key={index}>
                {el.label}
                <svg
                  onClick={() => deleteElement(index)}
                  className="List-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </li>
            )
          )}
        </ul>
      </div>
      <div>{lists.length} item left</div>
    </div>
  );
};

export default Home;




  // const handleKey = (e) => {
  //   if (e.key === "Enter" && toDo.trim() !== "") {
  //       const newTask = {
  //         label: toDo,
  //         done: false
  //       }
  //       setToDo("");
  //     // const newTasks = [...lists, newTask];
  //     // updateTasks(newTasks);
  //     // getAllTask();
  //     }
  // };

{/* <button className="btn btn-success" onClick={updateTasks}>Enviar tarea</button> */}

// const handleKey = (e) => {
//   if (e.key === "Enter") {
//     if (toDo.trim() !== "") {
//       const newTask = {
//         label: toDo,
//         done: false,
//       };
//       const newTasks = [...lists, newTask];
//       setToDo("");
//       updateTasks(newTasks);
//       getAllTask();
//     } else {
//       alert("Escribe una palabra");
//     }
//   }
// };

  // const updateTasks = (newTasks) => {
  //   fetch(url, {
  //     method: "PUT",
  //     body: JSON.stringify(newTasks),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       if (!res.ok) throw Error(res.statusText);
  //       return res.json();
  //     })
  //     .then((response) => getAllTask())
  //     .catch((error) => console.error(error));
  // };
