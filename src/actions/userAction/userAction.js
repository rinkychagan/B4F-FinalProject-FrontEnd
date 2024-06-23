"use server";

export async function getNormalUser() {
  let response = await fetch("http://localhost:8084/api/v1/users/normalUsers", {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let data = await response.json();
  console.log(data.data);
  return data;
}


export async function getCurrentSessionId() {
  try {
    let headersList = {
      "Accept": "*/*",
     }
     
     let response = await fetch("http://localhost:3000/api/token", { 
       cache: "no-store",
       method: "GET",
       credentials: "include",
       headers: headersList
     });
     
     let data = await response.text();
    //  console.log(data);
     

  } catch (error) {
    console.log(error);
  }
}