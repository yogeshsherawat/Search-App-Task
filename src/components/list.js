import React, { Fragment, useState } from 'react';
import data from '../obj';

function App() {

    let [state, setState] = useState({
        queryHTML: null
    });

    let items = {};
    let queryItems = {};

    data.forEach(ele => {
        let category = ele.category;
        if (items[category] === undefined)
            items[category] = [];
        items[category].push(ele);
    })

    function getHTML(items) {
        return (Object.entries(items).map((category, index) => {
            return (<ul key={index}> {category[0]}
                {category[1].map(function (item, ind) {
                    return (
                        <li key={ind}> {item.name} </li>
                    );
                })}

            </ul>);
        }));
    }
        
    let list = getHTML(items);
    let itemHTML = list;


    const [query, setQuery] = useState("");

    function handleQueryChange(e) {
        setQuery(e.target.value);
        let lwrQuery = query.toLowerCase();
        data.forEach(ele => {
            let name = ele.name.toLowerCase();

            if (name.includes(lwrQuery)) {


                let category = ele.category;
                if (queryItems[category] === undefined)
                    queryItems[category] = [];
                queryItems[category].push(ele);

            }
        })
        console.log(queryItems);
        let slist = getHTML(queryItems);
        setState({ ...state, queryHTML: slist });
        console.log(list);
        
    }

    



    


    return (
        <Fragment>
            <div style={{ margin: '5px' }}>
                <input onChange={handleQueryChange} placeholder='search' value={query} />
                <br />
                <h1>Search query</h1>
                {state.queryHTML}
                <br />
                <h1>List</h1>
                {itemHTML}

            </div>
        </Fragment>
    );
}

export default App;
