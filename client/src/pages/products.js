import React, { useEffect, useState } from 'react';

export default function Products(){
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      fetch("/api/products")
      .then(res => res.json())
      .then(response => {
          setData(response.result)
        })
      .then(setIsLoading(false))

  }, []);

  
    return <div><h1> Products </h1>
    {isLoading && <p>Loading...</p>}
    {/* {data && <p>There is {data[0].title}</p>} */}
    {data.map((c, index) => (
        <div key={index}>
          {c.title && (
            <>
              <div>
                <h2 style={{ textDecoration: "Underline" }}>
                  {c.title}
                </h2>
                <p>{c.descr}</p>
                <p>{c.price}</p>
                <img src={c.img} alt ={c.descr}/>
                <form action="/api/carts" method='post'>
                <button>Add to Cart</button>
                </form>
              </div>
              <hr />
            </>
          )}
        </div>
      ))}
    </div>}