import classNames from 'classnames'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

function Button(props) {
    return (
        <div className={classNames(
            props.className,
            'inline-block',
            'w-1.5', 'h-1.5',
            'p-0.5','rounded-full',
            'bg-cyan-600',
            'bg-opacity-0',
            'hover:bg-opacity-50'
        )}>
            {props.add ?
                <AddIcon fontSize='16px'/> :
                <RemoveIcon fontSize='16px'/>}
        </div>
    )
}

export default function Tag(props) {
    return (
        <div className={classNames(
            'flex',
            'items-center',
        )}>
            <text>{props.tag}</text>
            <Button add/>
            <Button/>
        </div>
    )
}