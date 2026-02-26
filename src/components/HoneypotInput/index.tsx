export function HoneypotInput() {
  return (
    <div className="hidden">
      <label htmlFor="honeypot">
        Se você está preenchendo este campo, você está um robô.
      </label>
      <input
        id="honeypot"
        name="honeypot"
        type="text"
        autoComplete="off"
        tabIndex={-1}
      />
    </div>
  );
}
