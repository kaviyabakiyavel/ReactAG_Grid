import './App.css';
import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      columnDefs: [
        {headerName: 'Make',field:'make',sortable:true,filter:true,checkboxSelection:true},
        {headerName: 'Model',field:'make',sortable:true,filter:true},
        {headerName: 'Price',field:'price',sortable:true,filter:true}
      ],
      rowData:null,
      // rowData: [
      //   {make: 'Toyota',model: 'celica', price:35000},
      //   {make: 'Ford',model: 'Mondeo', price:32000},
      //   {make: 'Porsche',model: 'Boxter', price:72000}
      // ]
    }
  }

  componentDidMount(){
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
            .then(result => result.json())
            .then(rowData => this.setState({rowData}))
  }

  onButtonClick = () => {
    debugger
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(nodes => nodes.data);
    const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(',');
    alert(`Selected Nodes: ${selectedDataStringPresentation}`)
  }

  render(){
    console.log("this.state.rowData",this.state.rowData)
    return(
      <div className = "ag-theme-balham" style={{width:600,height: 600}}>
        <button onClick={this.onButtonClick}>Get Selected</button>
         <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            rowSelection="multiple"
         />
      </div>
    )
  }
}

export default App;
