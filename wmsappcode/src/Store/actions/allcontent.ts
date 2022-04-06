import AllcontentServices from '../../Services/AllcontentServices';
const service = new AllcontentServices();
export const SET_ALLCONTENT = 'SET_ALLCONTENT';
export const SET_ALLCONTENT_VIDEO = 'SET_ALLCONTENT_VIDEO';

export const setAllcontent = (content: any) => {
  return {type: SET_ALLCONTENT, contents:content};
};

export const setAllContentOpenModal = (content: any) => {
  return {type: SET_ALLCONTENT_VIDEO, contents:content};
};

export const getAllcontent = (index: any) => {
  return async (dispatch: any) => {
    try {
      const response = await service.get_allcontents();
   
      const allcontent = response;
      dispatch(setAllcontent(allcontent));
    } catch (err) {
      throw err;
    }
  };
};

export const setAllcontentNew = (index: any) => {
    
    let tempArray : any = [];
    
     
    return async (dispatch: any) => {
      try {
        const response = await service.get_allcontents();
        tempArray = response;
        for (let indexnext = 0; indexnext < tempArray.length; indexnext++) {
            if(indexnext === index){
                tempArray[indexnext].chkstate = true;
            }else{
                tempArray[indexnext].chkstate = false;
            }    
            
        } 
        const allcontent = tempArray;
        dispatch(setAllcontent(allcontent));
      } catch (err) {
        throw err;
      }
    };
  };

  export const getAllcontentVideo = (type: any) => {
    
    let tempArray : any = [];
    
    return async (dispatch: any) => {
      try {
        const response = await service.get_allcontents();
        tempArray = response;
        for (let indexnext = 0; indexnext < tempArray.length; indexnext++) {
                tempArray[indexnext].whichIcon = type;  
        } 
        const allcontent = tempArray;
        dispatch(setAllcontent(allcontent));
      } catch (err) {
        throw err;
      }
    };
  };

  export const allContentOpenModal = (modalstate: any) => {
    
    return async (dispatch: any) => {
      try {
        dispatch(setAllContentOpenModal(modalstate));
      } catch (err) {
        throw err;
      }
    };
  };
  