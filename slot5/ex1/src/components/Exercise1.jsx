function Exercise1() {

    // tinh ham double 
    const hamDouble = (x) => x * 2;
    // ham kiem tra so chan 
    const isEven = (x) => x % 2 === 0;
  return (
    <div>
      <h1>Exercise 1</h1>
      <p>Kết quả hamDouble(5): {hamDouble(5)}</p>
      <p>Kết quả isEven(10): {isEven(10) ? "Số chẵn" : "Số lẻ"}</p>
      <p>Kết quả isEven(7): {isEven(7) ? "Số chẵn" : "Số lẻ"}</p>
    </div>
  );
}

export default Exercise1;
