function ImagePreview({ image }) {

  if (!image) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <img
        src={image}
        alt="Generated"
        width="400"
      />
    </div>
  );
}

export default ImagePreview;