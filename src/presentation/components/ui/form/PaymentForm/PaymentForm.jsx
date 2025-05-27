import React, { useState } from "react";
import "./PaymentForm.css";

const PLANES = {
  "basico-mensual": 10000,
  "basico-anual": 100000,
  "premium-mensual": 30000,
  "premium-anual": 300000,
};

const PaymentForm = ({ onPagoExitoso }) => {

  const [paymentType, setPaymentType] = useState("psg");
  const [plan, setPlan] = useState("");
  const [valor, setValor] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    banco: "",
    tipoCuenta: "",
    tarjeta: "",
    cvv: "",
    fechaExp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlanChange = (e) => {
    const selectedPlan = e.target.value;
    setPlan(selectedPlan);
    setValor(PLANES[selectedPlan]);
  };

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
    setFormData((prev) => ({
      ...prev,
      banco: "",
      tipoCuenta: "",
      tarjeta: "",
      cvv: "",
      fechaExp: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!plan) {
      alert("Por favor, selecciona un plan.");
      return;
    }
    onPagoExitoso("¡Pago realizado con éxito!");

  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <label>
        Nombre completo:
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          placeholder="Tu nombre completo"
        />
      </label>

      <label>
        Cédula:
        <input
          type="text"
          name="cedula"
          value={formData.cedula}
          onChange={handleChange}
          required
          placeholder="Número de cédula"
        />
      </label>

      <label>
        Selecciona un plan:
        <select value={plan} onChange={handlePlanChange} required>
          <option value="">-- Seleccionar --</option>
          <option value="basico-mensual">Básico - Mensual</option>
          <option value="basico-anual">Básico - Anual</option>
          <option value="premium-mensual">Premium - Mensual</option>
          <option value="premium-anual">Premium - Anual</option>
        </select>
      </label>

      {valor !== "" && (
        <label>
          Valor a pagar:
          <input
            type="text"
            value={`$${valor.toLocaleString("es-CO")}`}
            disabled
            style={{ fontWeight: "bold", color: "#27ae60" }}
          />
        </label>
      )}

      <fieldset className="payment-type">
        <legend>Tipo de pago:</legend>
        <label>
          <input
            type="radio"
            name="paymentType"
            value="psg"
            checked={paymentType === "psg"}
            onChange={handlePaymentTypeChange}
          />
          Pago por PSE (Banco)
        </label>
        <label>
          <input
            type="radio"
            name="paymentType"
            value="tarjeta"
            checked={paymentType === "tarjeta"}
            onChange={handlePaymentTypeChange}
          />
          Tarjeta de crédito
        </label>
      </fieldset>

      {paymentType === "psg" && (
        <>
          <label>
            Banco:
            <select
              name="banco"
              value={formData.banco}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un banco</option>
              <option value="banco1">Bancolombia</option>
              <option value="banco2">Banco de Bogota</option>
              <option value="banco2">BBVA</option>
              <option value="banco2">Davivvienda</option>
              <option value="banco3">Nequi</option>
            </select>
          </label>

          <label>
            Tipo de cuenta:
            <select
              name="tipoCuenta"
              value={formData.tipoCuenta}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione el tipo de cuenta</option>
              <option value="ahorro">Ahorros</option>
              <option value="corriente">Corriente</option>
            </select>
          </label>
        </>
      )}

      {paymentType === "tarjeta" && (
        <>
          <label>
            Número de tarjeta:
            <input
              type="text"
              name="tarjeta"
              value={formData.tarjeta}
              onChange={handleChange}
              maxLength={16}
              placeholder="1234 5678 9012 3456"
              required
            />
          </label>

          <label>
            CVV:
            <input
              type="password"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              maxLength={4}
              placeholder="123"
              required
            />
          </label>

          <label>
            Fecha de expiración:
            <input
              type="month"
              name="fechaExp"
              value={formData.fechaExp}
              onChange={handleChange}
              required
            />
          </label>
        </>
      )}

      <div className="buttons-container">
        <button type="submit" className="btn-submit">
          Pagar
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
