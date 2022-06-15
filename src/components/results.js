import React, {useState, useMemo, useEffect} from 'react'
import MarkedItems from './markedItems'
import styled from 'styled-components'

const ResultsContainer = styled.div`
  position: absolute;
  width: 400px;
  background: white;
  border: solid 1px #222;
  border-top: solid 1px transparent;
  margin-top: -3px;
  box-sizing: border-box;
  border-radius: 0 0 5px 5px;
`

export default function Results ({items, 
	onItemSelected,
	 query, 
	 onResultCalculated
	}){

		const [results, setResults] = useState([])

		const filteredItems= useMemo(() => 
			 findMatch(items, query), [items, query])
		
		useEffect(()=> {
			onResultCalculated(results)
		}, [results])

		function findMatch(items, query){
			const res= items.filter(i => {
				return i.title.toLowerCase()
				.indexOf(query) >= 0 && query.length >0 && query !== 0
			})
			setResults(res)
			return res
		}

	return(
		<ResultsContainer>
			{query !== "" ? filteredItems.map((item) => (
				<MarkedItems key={item.id} item={item} onClick={onItemSelected} query={query}/>))
			:""}
		</ResultsContainer>
	)
}