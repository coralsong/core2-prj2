const nose = document.getElementById("nosePath");

function stretchNose(length) {
  const newLength = 120 + length;
  nose.setAttribute(
    "d",
    `M10 50 L${newLength} 50`
  );
}