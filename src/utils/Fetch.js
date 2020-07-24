async function fetchGet(url) {
  try {
    let response = await fetch(url, {
      headers: { Authorization: "bearer " + localStorage.getItem("token") },
    });
    if (response.status === 403) {
      return { data: null };
    }
    let data = await response.json();
    return data;
  } catch (error) {
    alert(error, "Hubo un error en la aplicación. ");
    console.error(error);
  }
}

async function fetchPut(url, data) {
  let postObje = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "bearer " + localStorage.getItem("token"),
    },
  };
  try {
    let response = await fetch(url, postObje);
    if (response.status === 403) {
      return null;
    }
    let data = await response.json();
    return data;
  } catch (error) {
    alert(error, "Hubo un error en la aplicación. ");
    console.error(error);
  }
}

async function fetchPost(url, data) {
  let postObje = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "bearer " + localStorage.getItem("token"),
    },
  };
  try {
    let response = await fetch(url, postObje);
    if (response.status === 403) {
      return null;
    }

    let data = await response.json();
    return data;
  } catch (error) {
    alert(error, "Hubo un error en la aplicación. ");
    console.error(error);
  }
}

async function fetchDelete(url) {
  try {
    let response = await fetch(url, {
      method: "DELETE",
      headers: { Authorization: "bearer " + localStorage.getItem("token") },
    });
    if (response.status === 403) {
      return null;
    }
    let data = await response.json();
    return data;
  } catch (error) {
    alert(error, "Hubo un error en la aplicación. ");
    console.error(error);
  }
}

export { fetchGet, fetchDelete, fetchPost, fetchPut };
