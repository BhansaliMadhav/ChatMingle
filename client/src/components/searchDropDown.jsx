import React from 'react'

async function search() {
    let response = await fetch(
      process.env.REACT_APP_BASE_URL + "/search/userId",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          text: searched,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    // console.log(data);
  }


export default searchDropDown
