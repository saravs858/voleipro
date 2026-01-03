console.log("CONTACT.JS OK");

const form = document.getElementById("contact-form");
const feedback = document.getElementById("form-feedback");

if (!form) {
  console.error("FORM NÃO ENCONTRADO");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value,
    message: form.message.value
  };

  console.log("ENVIANDO:", data);

  try {
    const response = await fetch("/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log("RESPOSTA:", result);

    feedback.innerText = "Mensagem enviada!";
    form.reset();
  } catch (err) {
    console.error("ERRO FETCH:", err);
    feedback.innerText = "Erro ao enviar";
  }
});
