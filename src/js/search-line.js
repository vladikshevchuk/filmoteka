export default function onSearchLine(event) {
  event.preventDefault();
  const {
    elements: { search },
  } = event.currentTarget;
  console.log(search.value);
}
