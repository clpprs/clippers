import classNames from 'classnames'

import { IconButton, Autocomplete, Box } from '@mui/material'
import SearchSharpIcon from '@mui/icons-material/SearchSharp'

function SearchBar(props) {
    return (
        <Autocomplete
            id='tag-search'
            options={props.tags}
            autoHighlight
            // getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box component="li" {...props}>
                    {option}
                </Box>
            )}
            renderInput={(params) => (
                <div className={classNames(props.className, [
                    'inline-flex',
                    'ml-1', 'h-8',
                    'w-64',
                    'rounded',
                    'bg-neutral-350',
                    'items-center'
                ])}>
                    <div class='flex-1 pl-10 h-full' ref={params.InputProps.ref}>
                        <input style={{height: '100%', backgroundColor: '#00000000'}} placeholder='Search tags...' type="text" {...params.inputProps}/>
                    </div>
                    <IconButton className='fixed-important p-1'>
                        <SearchSharpIcon color='#3a3a3a' />
                    </IconButton>
                </div>
            )}
        />
    )
}

const tags = [
    "scenery",
    "bakemonogatari",
    "action",
    "dialogue",
    "still",
    "araragi kyomi",
    "araragi karen",
    "araragi tsukihi",
    "kanbaru suruga",
    "hanekawa tsubasa",
    "oshino meme",
    "oshino shinobu",
    "kiss-shot acerola-orion heart-under-blade",
    "oshino ougi",
    "yotsugi ononoki",
    "mayoi hachikuji",
]

function Navbar(props) {
    return (
        <div className={classNames([
            'flex', /*'fixed',*/
            'w-screen', 'h-11',
            'bg-black',
            'justify-center', 'items-center'
        ])}>
            <div className='inline-flex flex-1 mr-auto items-center'>
                <SearchBar tags={tags}/>
            </div>
            <div className='text-center'>
                <h1 className={classNames([
                    'text-2xl', 'font-semibold', 'roboto-mono',
                    'tracking-wide',
                    'text-white'
                ])}>
                    CLIPPERS
                </h1>
            </div>
            <div className='flex-1 ml-auto'>

            </div>
        </div>
    )
}

export default Navbar;