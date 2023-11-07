import React from 'react'
const SelectCurency = (props) => {
    const {
        selectedCurrency,
        currency,
        tokens=[],
        title
      } = props;
  return (
    <div className='select-currency'> 
        <label >{title ==="from"? " From" : "To"}</label>
         <select value={currency} onChange={(e) => selectedCurrency(e.target.value)}>
          {tokens.map((token, i) => {
            return (
              <option key={i} value={token.currency}>
                {token.currency}
              </option>
            );
          })}
        </select>
    </div>
  )
}

export default SelectCurency