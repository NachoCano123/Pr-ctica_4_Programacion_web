import { useState } from "preact/hooks";

type Client = {
  Name: string;
  Email: string;
  Address: string;
  City: string;
  Country: string;
  Phone: number;
};

export default function ClientForm() {
  const [client, setClient] = useState<Client>({
    //Parametros por defecto del cliente
    Name: "",
    Email: "",
    Address: "",
    City: "",
    Country: "",
    Phone: 0,
  });

  function handleChange(event: any) {
    event.preventDefault(); //hace que el formulario no haga su comportamiento por defecto
    if (
      client.Name === "" || client.Email === "" || client.Address === "" ||
      client.City === "" || client.Country === "" || client.Phone === 0
    ) {
      throw new Error("Faltan datos");
    }
    fetch("/api/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    });
  }

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "20px",
      }}
      onSubmit={handleChange} //Cuando el formulario se complete va a la funcion handleChange, la cual añade el cliente a la base de datos
    >
      <input
        type="text"
        placeholder="Name"
        value={client?.Name}
        onChange={(event) => setClient({ ...client, Name: event.target.value })}
      />
      <input
        type="text"
        placeholder="Email"
        value={client?.Email}
        onChange={(event) =>
          setClient({ ...client, Email: event.target.value })}
      />
      <input
        type="text"
        placeholder="Address"
        value={client?.Address}
        onChange={(event) =>
          setClient({ ...client, Address: event.target.value })}
      />
      <input
        type="text"
        placeholder="City"
        value={client?.City}
        onChange={(event) => setClient({ ...client, City: event.target.value })}
      />
      <input
        type="text"
        placeholder="Country"
        value={client?.Country}
        onChange={(event) =>
          setClient({ ...client, Country: event.target.value })}
      />
      <input
        type="number"
        placeholder="Phone"
        value={client?.Phone}
        onChange={(event) =>
          setClient({ ...client, Phone: event.target.value })}
      />
      <button type="submit">Create</button>
    </form>
  );
}
