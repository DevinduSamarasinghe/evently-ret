import {create} from 'zustand';	

const useStore = create((set)=> ({

    googleData: null,
    setGoogleData: (googleData)=> set({googleData}),
}))

export default useStore;