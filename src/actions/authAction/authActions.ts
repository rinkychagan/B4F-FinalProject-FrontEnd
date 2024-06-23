"use server";
import { cookies } from "next/headers";
export async function getLogin(userLogin: { email: string, password: string }) {

  try {
      const response = await fetch('http://localhost:8084/api/v1/users/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "email": userLogin.email,
              "password": userLogin.password
          }),
      })
      if (response.status === 200) {
          const data = await response.json().then((data) => data);
          cookies().set("jwt", data.token, {
              httpOnly: true,
          })

          return {
              status: 200,
              data: data
          }
      }
      return response.json();
     
  } catch (error) {

    // Handle different types of errors appropriately
    if (error instanceof SyntaxError) {
      // JSON parsing error
      return {
        status: 500,
        message: 'Internal server error. Please try again later.',
      };
    } else if (error instanceof TypeError) {
      // Network error or fetch failed
      return {
        status: 503,
        message: 'Service unavailable. Please check your network connection and try again.',
      };
    } else {
      // Other types of errors
      return {
        status: 400,
        message: (error as Error).message || 'An unknown error occurred. Please try again.',
      };
    }
  }
}


export async function getUpdatePassword(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
) {
  try {
    const response = await fetch(
      "http://localhost:8084/api/v1/users/updatePassword",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies().get("jwt")?.value}`,
        },
        body: JSON.stringify({
          passwordCurrent: currentPassword,
          password: newPassword,
          passwordConfirm: confirmPassword,
        }),
      }
    );

    const data = await response.json();
    console.log(" data Update Password=============================", data);

    const token: string = data.token;
    console.log(" =================== response Update Password:::", token);

    cookies().set("jwt", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {

    // Handle different types of errors appropriately
    if (error instanceof SyntaxError) {
      // JSON parsing error
      return {
        status: 500,
        message: 'Internal server error. Please try again later.',
      };
    } else if (error instanceof TypeError) {
      // Network error or fetch failed
      return {
        status: 503,
        message: 'Service unavailable. Please check your network connection and try again.',
      };
    } else {
      // Other types of errors
      return {
        status: 400,
        message: (error as Error).message || 'An unknown error occurred. Please try again.',
      };
    }
  }
}

export async function signUpAction(formData:any) {

  // const name = formData.get("name");
  // const email = formData.get("email");
  // const password = formData.get("password");
  // const confirmPassword = formData.get("confirmPassword");

  console.log("currentPassword, newPassword, confirmPassword", formData);

  try {
      const response = await fetch('http://localhost:8084/api/v1/users/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "name": formData.name,
              "email": formData.email,
              "password": formData.password,
              "passwordConfirm": formData.confirmPassword
          }),
      })

      const data = await response.json();
      const token: string = data.token;

      cookies().set("jwt", token, {
          httpOnly: true,
      })
      return data
  } catch (error) {

    // Handle different types of errors appropriately
    if (error instanceof SyntaxError) {
      // JSON parsing error
      return {
        status: 500,
        message: 'Internal server error. Please try again later.',
      };
    } else if (error instanceof TypeError) {
      // Network error or fetch failed
      return {
        status: 503,
        message: 'Service unavailable. Please check your network connection and try again.',
      };
    } else {
      // Other types of errors
      return {
        status: 400,
        message: (error as Error).message || 'An unknown error occurred. Please try again.',
      };
    }
  }
}


export async function getLoginUserDetails() {
  try {
    const response = await fetch(`http://localhost:8084/api/v1/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("jwt")?.value}`,
      },
    });
    if (response.status === 200) {
      return response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getSession() {
  return cookies().get("jwt")?.value;
}


export async function logout() {
  return cookies().delete("jwt");
}

export async function updateUserDetails(FormData: FormData) {
  try {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${cookies().get("jwt")?.value}`,
    };

    let response = await fetch("http://localhost:8084/api/v1/users/updateMe", {
      method: "PATCH",
      body: FormData,
      headers: headersList,
    });

    let data = await response.text();
    console.log(data);
  } catch (error) {

    // Handle different types of errors appropriately
    if (error instanceof SyntaxError) {
      // JSON parsing error
      return {
        status: 500,
        message: 'Internal server error. Please try again later.',
      };
    } else if (error instanceof TypeError) {
      // Network error or fetch failed
      return {
        status: 503,
        message: 'Service unavailable. Please check your network connection and try again.',
      };
    } else {
      // Other types of errors
      return {
        status: 400,
        message: (error as Error).message || 'An unknown error occurred. Please try again.',
      };
    }
  }
}