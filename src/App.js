import React, { useState, useEffect,useCallback, useRef, setInterval} from 'react';
import UsersList from "./UsersList"
import ToggleStatus from "./ToggleStatus"

const App = () => {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState('Asce')
  const [sortPricing, setSortPricing] = useState('$')
  const [filteredList, setFilteredList] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [userSelected, setUserSelected] = useState("null");

  console.log('parent render')

  // useRef to track previous function reference
  const prevHandleClickRef = useRef(null);

  React.useLayoutEffect(() => console.log("Before DOM update, ", sortOrder))
  React.useEffect(() => console.log("Before DOM update, ", sortOrder), [sortOrder])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          {
            method: 'GET',
          }
        );

        if (!response.ok) {
          return 'error failed to fetch data!';
        }

        const results = await response.json();

        setUsers(results);
      } catch (error) {
        console.log('error fetching data: ', error.message);
      }
    };

    fetchData();
  }, []);

  const quickSort = (usersArr, sort_order = "Asce") => {
    if(usersArr.length <= 1) return usersArr
    const pivot = usersArr[usersArr.length - 1]?.name?.split(" ").join("") || "" // last el
    const left = []
    const right = []
    
    for(let i=0; i < usersArr.length - 1; i++ ){
      const name = usersArr[i]?.name || ""
      const str = name.split(" ").join("") || ""
      
      console.log(str)
      const comparison = str.localeCompare(pivot)
      
      if(comparison < 0){
        left.push(usersArr[i])
      } else {
        right.push(usersArr[i])
      }
    }

    if(sort_order === 'Asce') {
      return [...quickSort(left, sort_order), usersArr[usersArr.length - 1], ...quickSort(right, sort_order)]
    } else {
      return [...quickSort(right, sort_order), usersArr[usersArr.length - 1], ...quickSort(left, sort_order)]
    }

  }
  
  useEffect(() => {
    if(users.length > 0) {
      const sortedUsersList = quickSort(users, sortOrder)
      setUsers(sortedUsersList)
    }
  }, [sortOrder])

  const handleSorting = () => {
    setSortOrder(prev => prev === 'Asce' ? 'Desc': 'Asce')
  }

  const handlePriceSorting = () => {
    console.log("sort pricing render")
   
    setSortPricing(prev => prev === '$' ? '$$': '$')
  }

  const compareFunctionReferences = (currentFunc) => {
    if (prevHandleClickRef.current !== currentFunc) {
      console.log("Function reference has changed!");
    } else {
      console.log("Function reference has not changed.");
    }
    prevHandleClickRef.current = currentFunc;
  };

  // Track function reference changes
  //compareFunctionReferences(handleSorting);


  return (
    <>
    
        {users.length > 0 && <UsersList sorting={handleSorting} priceSorting={handlePriceSorting} users={users}  />}
        <ToggleStatus status={sortOrder} />
     
    </>
  );
};

export default App;
