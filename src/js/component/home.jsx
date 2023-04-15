
import React, {useState, useEffect} from "react";



const Home = () => {
	const [lists, setLists] = useState([])
	const [toDo, setToDo] = useState('')
	const url = "https://assets.breatheco.de/apis/fake/todos/user/jverdugo"
	useEffect(() =>{
		getAllTask()
	},[])
	const getAllTask = () =>{
		fetch(url)
		.then((res) => res.json())
		.then((data) => {
			setLists(data)
		})
	}



	const handleKey = (e) => {
		if (e.key === "Enter") {
		  if (toDo.trim() !== "") {
			setToDo("");
			setLists(toDo, ...setToDo)
		  } else {
			alert("Escribe una palabra");
		  }
		}
	  };

	  console.log(lists);
	

	const data =[ {
		"label": "probando", 
		"done": false
	  },
	  {
		"label": "probando probando", 
		"done": false
	  },
	  {
		"label": "probando probando probando", 
		"done": false
	  },
	 
	]
	  // hacer el POST...
	  fetch('https://assets.breatheco.de/apis/fake/todos/user/jverdugo', {
		method: 'PUT', // or 'POST'
		body: JSON.stringify(data), // data can be a `string` or  an {object} which comes from somewhere further above in our application
		headers:{
		  'Content-Type': 'application/json'
		}
	  })
	  .then(res => {
		if (!res.ok) throw Error(res.statusText);
		return res.json();
	  })
	  .then(response => console.log('Success:', response))
	  .catch(error => console.error(error));


	return (
		<div className="List">
			<h1 className="List-h1">To do List</h1>
		<div >
		<input
          className="List-input"
          type="text"
          placeholder="What needs to be done?"
		  value={toDo}
		  onChange={(e) => setToDo(e.target.value)}
		  onKeyDown={handleKey}
        ></input>
			<ul>
				{lists.map((el,index) =>{
					return(
						<li className="List-li" key = {index} id = {index}>{el.label}</li>
					)
				})}
			</ul>
		</div>
		</div>
	);
};

export default Home;
