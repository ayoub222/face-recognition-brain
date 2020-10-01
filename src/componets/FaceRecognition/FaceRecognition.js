import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({imgUrl, box }) => {
	return (
		<div className='center ma'>
		   <div className='absolute mt2'>
               <img id='imputimg' alt='' src={imgUrl} width='500px' heigh='auto'/>
               <div className='bounding-Box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
           </div>
		</div>
		);
}

export default FaceRecognition;