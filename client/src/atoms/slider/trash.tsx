import { useEffect, useState } from "react";




const somethingParernt = () => {
    
    const [property, setProperty] = useState(0);
    return <Something property={property} setProperty={setProperty} />
}

const Something = ({property, setProperty}) => {

return 현재숫자는 {property}
<Button> + 1 </Button>

    
}