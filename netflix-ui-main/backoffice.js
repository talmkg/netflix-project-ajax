const params = new URLSearchParams(window.location.search);
const appointmentId = params.get("appointmentId");

window.onload = async () => {
  if (appointmentId) {
    // We are editing - let's get the event to edit,
    // and prefill the form with its info.
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/agenda/${appointmentId}`
    );
    const appointment = await response.json();

    let submitButton = document.querySelector("#submit-button");
    submitButton.innerText = "Edit Event";
    submitButton.classList.remove("btn-primary");
    submitButton.classList.add("btn-success");

    document.querySelector("#event-name").value = appointment.name;
    document.querySelector("#event-description").value =
      appointment.description;
    document.querySelector("#event-price").value = appointment.price;

    // time looks like this: "2022-08-18T11:16:00.000Z"
    // The timezone info will break the input field, so we don't need .000Z
    // time.split('.') . -----> ['2022-08-18T11:16:00', '000Z']
    // time.split('.')[0] -----> '2022-08-18T11:16:00'
    document.querySelector("#event-time").value =
      appointment.time.split(".")[0];
  }
};

async function onFormSubmit(event) {
  // We call this to avoid the default action for the event.
  // In this case, this is a submit event, the default action is
  // the refresh of the page.
  // We dont't want that...
  event.preventDefault();

  const newEvent = {
    name: document.querySelector("#event-name").value,
    description: document.querySelector("#event-description").value,
    price: document.querySelector("#event-price").value,
    time: document.querySelector("#event-time").value,
  };

  const options = {
    method: appointmentId ? "PUT" : "POST",
    // BODY NEEDS TO BE A STRING, BECAUSE THIS IS HTTP,
    // so we convert the object into a string, JSON string
    body: JSON.stringify(newEvent),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    // JavaScript please TRY to execute this block of code...
    // Whenever an erorr presents inside here, we will move directly
    // to the catch block, and we will execute the code there.

    const endpoint = appointmentId
      ? `https://striveschool-api.herokuapp.com/api/agenda/${appointmentId}`
      : "https://striveschool-api.herokuapp.com/api/agenda/";

    const response = await fetch(endpoint, options);
    // If there is an error here, when fetching...
    // This code will not go forward -> we jump to the catch block.

    if (response.ok) {
      // Because we want to do this only if the response code is 200 OK
      alert(
        appointmentId
          ? "Appointment edited successfully!"
          : "Appointment created successfully!"
      );
    } else {
      throw new Error("ERROR WHILE EXECUTING THE TRY BLOCK!");
    }
  } catch (error) {
    // Any error will be catched here.
    console.error(error);
  }
}
