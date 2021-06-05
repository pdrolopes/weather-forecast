import React,  { useState, useMemo, ChangeEventHandler, HtmlHTMLAttributes } from 'react';
import Region from './Region';
import { RegionType } from '../types';

type Props = {
    onRegionClick(id: number): void;
    regions: Array<RegionType>;
};

function RegionList (props: Props) {
    const { regions, onRegionClick } = props;

    const [filter, setFilter] = useState("");
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => setFilter(event.target.value);
    const filteredList = useMemo(() => regions.filter(region => region.name.toLowerCase().includes(filter.toLowerCase())), [filter, regions]);

    return (
        <div>
            <input onChange={handleInputChange} value={filter} />

            {filteredList.map(region => {
                const { id, name } = region;
                return (<Region key={id} id={id} name={name} onClick={() => onRegionClick(id)} />)
            })}

        </div>
    );
}

export default RegionList;