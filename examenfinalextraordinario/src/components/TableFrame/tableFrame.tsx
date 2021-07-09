import React, {FC, useState} from 'react'
import trashIcon from "../../Assets/trashIcon.png"
import calendarIcon from "../../Assets/calendarIcon.png"
import "../TableFrame/tableFrame.css"

interface ITableData {
    quantity: number
    companyName?: string
    project: string
    expiryDate: string
    mbutton: boolean
}

interface IProyect{
    name: string
}

const companyArray: string[] = [
    "BQ",
    "Universidad de Nebrija",
    "Amazon",
    "VOOPOO"
]

const TableFrame: FC<{}> = () => {
    const [displayProjects, setDisplayProjects] = useState<boolean>(false)
    const [rows, setRows] = useState<ITableData[]>([{
        quantity: 0,
        companyName: "",
        project: companyArray[0],
        expiryDate: "mm/dd/yyyy",
        mbutton: false
    }])
    const [trampita, setTrampita] = useState<number>(-1)
    const displayProject = () => {
        return (
            <div>
                {companyArray.map((elem) => {
                    return <div>
                        <div onClick={(e) => [setDisplayProjects(!displayProjects), changeRowValue(companyArray[companyArray.indexOf(elem)], "p", trampita)]}>{elem}</div>
                    </div>
                })}
            </div>
        )
    }

    const newRow =  () => {
        let aux: boolean = false
        if(rows.length >= 1){
            aux = true
        }
        const newEmptyRow: ITableData = {
            quantity: 0,
            companyName: "",
            project: companyArray[0],
            expiryDate: "mm/dd/yyyy",
            mbutton: aux
        }
        setRows(r => [newEmptyRow, ...r])
    }

    const changeRowValue = (newValue: string, toChange: string, toChangeIndex: number) => {
        let newRowValue: ITableData
        if(toChangeIndex !== rows.length-1){
            if(toChange === "q"){
                newRowValue = {
                    quantity: parseFloat(newValue),
                    companyName: rows[toChangeIndex].companyName,
                    project: rows[toChangeIndex].project,
                    expiryDate: rows[toChangeIndex].expiryDate,
                    mbutton: rows[toChangeIndex].mbutton
                }
            }else if(toChange === "c"){
                newRowValue = {
                    quantity: rows[toChangeIndex].quantity,
                    companyName: newValue,
                    project: rows[toChangeIndex].project,
                    expiryDate: rows[toChangeIndex].expiryDate,
                    mbutton: rows[toChangeIndex].mbutton
                }
            }else if(toChange === "p"){
                newRowValue = {
                    quantity: rows[toChangeIndex].quantity,
                    companyName: rows[toChangeIndex].companyName,
                    project: newValue,
                    expiryDate: rows[toChangeIndex].expiryDate,
                    mbutton: rows[toChangeIndex].mbutton
                }
            }
            setRows(rows.map((elem) => {
            return rows.indexOf(elem) === toChangeIndex ? newRowValue : elem
            }))
        }
    }

    const deleteRow = (toDelete: number) => {
        const aux = rows.filter((elem) => {
            return rows.indexOf(elem) !== toDelete
        })
        if(aux.length === 0){
            newRow()
        }else{
            setRows(aux)
        }
    }

    return (
        <div>
            <table className="tableD">
                <thead className="headersColor">
                    <tr> 
                        <th>Cantidad(€)</th>
                        <th>Nombre empresa</th>
                        <th>Proyecto</th>
                        <th>Vencimiento</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody className="bodycolor">
                    {rows && rows.map((elem) => {
                        return <tr>
                            <td><input type="number" value={elem.quantity} className="inputRows" onChange={(e) => changeRowValue(e.target.value, "q", rows.indexOf(elem))}/></td>
                            <td><input type="text" value={elem.companyName} className="inputRows" onChange={(e) => changeRowValue(e.target.value, "c", rows.indexOf(elem))}/></td>
                            <td onClick={(e) => [setDisplayProjects(!displayProjects), setTrampita(rows.indexOf(elem))]}>{elem.project}</td>
                            <td>{elem.expiryDate} <img src={calendarIcon} alt="calendar" className="calendarImg"/></td>
                            {!elem.mbutton && (<td><button onClick={(e) => {newRow()}}>Añadir</button></td>)}
                            {elem.mbutton && (<td><button onClick={(e) => deleteRow(rows.indexOf(elem))} className="trashButton"><img src={trashIcon} alt="trash"/></button></td>)}
                        </tr>
                        })}
                    </tbody>
            </table>
            {displayProjects && displayProject()}
        </div>
    )
}

export default TableFrame;