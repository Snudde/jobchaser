type GroceryItemProps = {
  name: string;
};

function GroceryItem(props: GroceryItemProps) {
  function handleClick() {
    alert(props.name + " added to shopping cart.");
  }
  return <button onClick={handleClick}>{props.name}</button>;
}

export default GroceryItem;
