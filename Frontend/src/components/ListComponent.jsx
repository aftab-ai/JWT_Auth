function ListComponent({ listItem }) {
  return (
    <>
      <ul className="list-disc list-outside ml-4 mt-2 space-y-2 text-sm text-justify text-[#3D503A]">
        {listItem.map((item) => (
          <li key={item.id}>
            <span className="text-[#10403B]">{item.key}</span>:{" "}
            {Array.isArray(item.value) ? (
              <ul className="list-[circle] list-outside ml-6 mt-1 space-y-1 font-medium">
                {item.value.map((val, index) => (
                  <li key={index}>{val}</li>
                ))}
              </ul>
            ) : (
              <span className="font-medium">{item.value}</span>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListComponent;
