
import { Oval } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';


export const Loader = () => {
    return (
        <LoaderWrapper>
            <Oval
                height={80}
                width={80}
                color="#3f51b5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#f1f1f1f1"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </LoaderWrapper>
    )
}