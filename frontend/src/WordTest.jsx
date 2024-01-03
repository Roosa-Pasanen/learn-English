let b = "b";

export default function WordTest() {
  const fetchInfo = async () => {
    const data = await fetch(`${import.meta.env.VITE_API_URL}/api/wordbank`);
    b = JSON.stringify(data);
  };

  return (
    <div>
      <button onClick={() => fetchInfo()}>Fetch</button>
      <div>{b}</div>
    </div>
  );
}
