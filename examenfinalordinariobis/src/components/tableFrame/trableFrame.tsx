import React, {FC, useState, useEffect} from "react"

interface IRowInfo{
    name: string,
    mail: string,
    birthDay: string,
}

const TableFrame: FC<{}> = () => {
    const [rowsInfo, setRowsInfo] = useState<IRowInfo[]>([])
    const [oldRowsInfo, setOldRowsInfo] = useState<IRowInfo[]>(rowsInfo)
    const [newValue, setNewValue] = useState<IRowInfo>({name: "", mail: "", birthDay: ""})
    const [changeId, setChangeId] = useState<IRowInfo>({name: "", mail: "", birthDay: ""})
    const [changeRow, setChangeRow] = useState<boolean>(false);
    const [by, setBy] = useState<boolean[]>([false, false, false])

    const addNewRow = () => {
        const newEmptyRow: IRowInfo = {
            name: "Add new name",
            mail: "Add new mail",
            birthDay: "Add new birthday",
        }

        setRowsInfo(r => [newEmptyRow, ...r])
    }

    const validInfo = (toCheck: IRowInfo) => {
        const auxMail = toCheck.mail.split("@")
        if(auxMail.length === 2){
            const dot = toCheck.mail.split(".")
            if(dot.length > 2 && dot.length <= 3){ //.com or .nebrija.es
                const auxData = toCheck.birthDay.split("-")
                if(auxData.length === 2){
                    if(auxData[0].length === 4 && (auxData[1].length + auxData[2].length) === 4){
                        return true
                    }
                }
            }
        }
        return false;
    }

    const changeRowValue = () => {
        return (
            <div>
                <input type="text" placeholder="name" value={newValue.name} onChange={(e) => setNewValue({name: e.target.value, mail: newValue.mail, birthDay: newValue.birthDay})}/>
                <input type="text" placeholder="email" value={newValue.mail} onChange={(e) => setNewValue({name: newValue.name, mail: e.target.value, birthDay: newValue.birthDay})}/>
                <input type="text" placeholder="birthdate" value={newValue.birthDay} onChange={(e) => setNewValue({name: newValue.name, mail: newValue.mail, birthDay: e.target.value})}/>
                <button onClick={(e) => [setRowsInfo(rowsInfo.map((elem, index) => {
                   return elem.mail === changeId.mail ? newValue : elem
                })), setChangeRow(false)]}>Summit</button>
            </div>
        )
    }

    const deleteRow = () => {
        if(changeId !== {name: "", mail: "", birthDay: ""}){
            setRowsInfo(rowsInfo.filter((elem) => {
                return elem.mail !== changeId.mail
            }))
        }
    }

    const sortBy = () => {
        if(by){
            let auxBool = false
            let auxa = "";
            let auxb = "";
            setOldRowsInfo(rowsInfo);
            const auxSort = rowsInfo.sort((a, b) => {
                if(by[0]){
                    auxa = a.name
                    auxb = b.name
                }else if(by[1]){
                    auxa = a.mail
                    auxb = b.mail
                }else if(by[2]){
                    auxa = a.birthDay
                    auxb = b.birthDay
                }else{
                    setRowsInfo(oldRowsInfo)
                    auxBool = true
                }

                if(auxa < auxb){
                    return -1
                }
                if(auxa > auxb){
                    return 1
                }
                return 0;
            })
            if(!auxBool){
                setRowsInfo(auxSort);
            }else{
                setRowsInfo(oldRowsInfo);
            }
        }else{
            console.log("Something went wrong...")
        }
    }

    return(
        <div>
            <div>
                <div>
                    Press add row button to add a new row, then double click in the new row to add the data. Also you can modify existing rows with double click. <br />
                    To delete a row, just click in the row you want to delete and then press delete row.
                    To sort, click on any of the headers of the table. There is a bug on this part, when you press for the first time it can delete your table, but if thats the case add the info and try again. <br />
                    Also once you sort any of the rows, you can not set the table to the orders of entry, but you can sort allways depending of the header you click. <br />
                    You may have to click two times to sort. The sorting is kind of bad, but it works.
                </div>
                <button onClick={(e) => addNewRow()}>Add Row</button>
                <button onClick={(e) => deleteRow()}>Delete row</button>
                {changeRow && changeRowValue()}
            </div>
            <table>
                <thead>
                    <tr>
                        <th onClick={(e) => [sortBy(), setBy([!by[0], false, false])]}>Nombre</th>
                        <th onClick={(e) => [sortBy(), setBy([false, !by[1], false])]}>Correo electrónico</th>
                        <th onClick={(e) => [sortBy(), setBy([false, false, !by[2]])]}>Fecha de nacimiento</th>
                    </tr>
                </thead>
                <tbody>
                    {rowsInfo.length !== 0 && rowsInfo.map((elem) => {
                        return <tr onDoubleClick={(e) => [setChangeRow(true), setNewValue({name: "", mail: "", birthDay: ""})]} onClick={(e) => setChangeId(elem)}>
                            <td>{elem.name}</td>
                            <td>{elem.mail}</td>
                            <td>{elem.birthDay}</td>
                        </tr>
                })}
                </tbody>
            </table>
        </div>
    )
}

export default TableFrame;