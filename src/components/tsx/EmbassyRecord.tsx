import '../css/EmbassyRecord.css'


interface EmbassyType {
    country: string,
    website: string,
    phone: string,
    photo: string,
    state: string,
    city: string,
    postalAddress: string
}

interface IProps {
    record: EmbassyType,
    even: boolean
}


function EmbassyRecord({ record, even }: IProps) {
    return (
        <tr className={even ? "embassy-row-even" : "embassy-row-odd"}>
            <td className='embassy-column-text'><img className="embassy-column-image" alt="flag" src={record.photo} /></td>
            <td className='embassy-column-text'>{record.country}</td>
            <td className='embassy-column-text'><a href={record.website} className='embassy-link' target='__target'>{record.website}</a></td>
            <td className='embassy-column-text'><a href={'tel:' + record.phone} className='embassy-link'>{record.phone}</a></td>
            <td className='embassy-column-text'>{record.state}</td>
            <td className='embassy-column-text'>{record.city}</td>
            <td className='embassy-column-text'>{record.postalAddress}</td>
        </tr>
    )
}

export default EmbassyRecord