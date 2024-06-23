import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function fetchToursData() {
  "use server";
  try {
    const response = await fetch("http://localhost:8084/api/v1/tours", {
      cache: "no-store",
    });

    return response.json();
  } catch (error) {
    // Handle different types of errors appropriately
    if (error instanceof SyntaxError) {
      // JSON parsing error
      return {
        status: 500,
        message: "Internal server error. Please try again later.",
      };
    } else if (error instanceof TypeError) {
      // Network error or fetch failed
      return {
        status: 503,
        message:
          "Service unavailable. Please check your network connection and try again.",
      };
    } else {
      // Other types of errors
      return {
        status: 400,
        message:
          error.message || "An unknown error occurred. Please try again.",
      };
    }
  }
}

/**
 * Fetches a tour by its ID from the server.
 *
 * @param {string} id - The ID of the tour to fetch.
 * @return {Promise<Object>} A promise that resolves to the JSON response from the server.
 *                           If there is an error, it resolves to an object with a status and message property.
 * @throws {SyntaxError} If there is an error parsing the JSON response.
 * @throws {TypeError} If there is a network error or the fetch fails.
 */
export async function getTourById(id) {
  "use server";
  try {
    const response = await fetch(`http://localhost:8084/api/v1/tours/${id}`, {
      cache: "no-store",
    });
    revalidatePath("/tour");
    return response.json();
  } catch (error) {
    // Handle different types of errors appropriately
    if (error instanceof SyntaxError) {
      // JSON parsing error
      return {
        status: 500,
        message: "Internal server error. Please try again later.",
      };
    } else if (error instanceof TypeError) {
      // Network error or fetch failed
      return {
        status: 503,
        message:
          "Service unavailable. Please check your network connection and try again.",
      };
    } else {
      // Other types of errors
      return {
        status: 400,
        message:
          error.message || "An unknown error occurred. Please try again.",
      };
    }
  }
}

/**
 * Inserts a tour into the database by sending a POST request to the server.
 *
 * @param {File} file - The file containing the tour data to be inserted.
 * @return {Promise<Object|{status: number, message: string}>} - The inserted tour data if successful, or an error object if an error occurred.
 */

export async function insertTour(file) {
  "use server";

  try {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${cookies().get("jwt")?.value}`,
    };

    let response = await fetch("http://localhost:8084/api/v1/tours", {
      method: "POST",
      body: file,
      headers: headersList,
    });
    revalidatePath("/tourRegistry");
    let data = await response.json();

    return data;
  } catch (error) {
    // Handle different types of errors appropriately
    if (error instanceof SyntaxError) {
      // JSON parsing error
      return {
        status: 500,
        message: "Internal server error. Please try again later.",
      };
    } else if (error instanceof TypeError) {
      // Network error or fetch failed
      return {
        status: 503,
        message:
          "Service unavailable. Please check your network connection and try again.",
      };
    } else {
      // Other types of errors
      return {
        status: 400,
        message:
          error.message || "An unknown error occurred. Please try again.",
      };
    }
  }
}

export async function deleteTour(id) {
  "use server";

  try {
    const response = await fetch(`http://localhost:8084/api/v1/tours/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("jwt")?.value}`,
      },
    });

    revalidatePath("/tourRegistry");
  } catch (error) {
    // Handle different types of errors appropriately
    if (error instanceof SyntaxError) {
      // JSON parsing error
      return {
        status: 500,
        message: "Internal server error. Please try again later.",
      };
    } else if (error instanceof TypeError) {
      // Network error or fetch failed
      return {
        status: 503,
        message:
          "Service unavailable. Please check your network connection and try again.",
      };
    } else {
      // Other types of errors
      return {
        status: 400,
        message:
          error.message || "An unknown error occurred. Please try again.",
      };
    }
  }
}

export async function searchTours(search) {
  "use server";
  try {
    let response = await fetch(
      "http://localhost:8084/api/v1/tours/searchForTour?startLocation=" +
        search +
        "",
      {
        method: "GET",
      }
    );
    let data = await response.json();
    // console.log("data form tour search =================================", data.data.tours);

    return data.data.tours;
  } catch (error) {
    // Handle different types of errors appropriately
    if (error instanceof SyntaxError) {
      // JSON parsing error
      return {
        status: 500,
        message: "Internal server error. Please try again later.",
      };
    } else if (error instanceof TypeError) {
      // Network error or fetch failed
      return {
        status: 503,
        message:
          "Service unavailable. Please check your network connection and try again.",
      };
    } else {
      // Other types of errors
      return {
        status: 400,
        message:
          error.message || "An unknown error occurred. Please try again.",
      };
    }
  }
}

export async function updateTour(file, id) {
  "use server";
  try {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${cookies().get("jwt")?.value}`,
    };
    let response = await fetch(`http://localhost:8084/api/v1/tours/${id}`, {
      method: "PUT",
      body: file,
      headers: headersList,
    });
    let data = await response.json();
    revalidatePath("/tourRegistry");
    return data;
  } catch (error) {
    // Handle different types of errors appropriately
    if (error instanceof SyntaxError) {
      // JSON parsing error
      return {
        status: 500,
        message: "Internal server error. Please try again later.",
      };
    } else if (error instanceof TypeError) {
      // Network error or fetch failed
      return {
        status: 503,
        message:
          "Service unavailable. Please check your network connection and try again.",
      };
    } else {
      // Other types of errors
      return {
        status: 400,
        message:
          error.message || "An unknown error occurred. Please try again.",
      };
    }
  }
}
