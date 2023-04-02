import * as React from 'react';
import './style.css';

export default function App() {
  const [resourceType, setResourceType] = React.useState('posts');
  const [items, setItems] = React.useState([]);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  // useEffect run after every render
  //it is close replacement of componentDidMount,componentWillMount,componentwillUnmount
  //without conditional array it will run every type
  React.useEffect(() => {
    console.log('Run every type');
  });

  //it will run only one time; page load
  React.useEffect(() => {
    console.log('run on page mount');
  }, []);

  //it will run when page load and resourceType value is changed
  React.useEffect(() => {
    console.log('resourceType Change');
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then((response) => response.json())
      .then((json) => setItems(json));

    return () => {
      console.log('Run every time after first render');
    };
  }, [resourceType]);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  //clean up work
  React.useEffect(() => {
    console.log('Add event listner');
    window.addEventListener('resize', handleResize);

    //it will execute when component will componentwillUnmount
    //if conditional array is given then every time it will execute first after first render: eg; above
    return () => {
      console.log('Clean up');
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <button onClick={() => setResourceType('posts')}> Posts </button>
      <button onClick={() => setResourceType('users')}> Users </button>
      <button onClick={() => setResourceType('comments')}> Comments </button>

      <h1>{windowWidth}</h1>
      <h1>{resourceType}</h1>
      {items.map((item) => {
        return <pre key={item.id}>{JSON.stringify(items)}</pre>;
      })}
    </div>
  );
}
