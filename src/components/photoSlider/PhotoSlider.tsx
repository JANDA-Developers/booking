import React from 'react';
import { JDslider, JDphotoFrame, JDslide } from '@janda-com/front';
import { IDiv } from '../../types/interface';
import { isEmpty } from '../../utils/utils';

interface IProp extends IDiv {
    images: string[];
}

export const PhotoSlider: React.FC<IProp> = ({ images, ...props }) => {

    if (isEmpty(images)) {
        images.push("https://s3.ap-northeast-2.amazonaws.com/booking.stayjanda.files" + "/infographic/noimg.png")
    }
    // @ts-ignore
    return <div  {...props}>
        <JDslider dots={false} displayArrow={false} mb="no" mr="no">
            {(images || []).map((img, i) => (
                <JDslide key={"photoSlider" + i}>
                    <JDphotoFrame mb="no" style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }} src={img} />
                </JDslide>
            ))}
        </JDslider>
    </div>;
};

export default PhotoSlider;