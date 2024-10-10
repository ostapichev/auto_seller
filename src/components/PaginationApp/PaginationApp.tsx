import { FC } from 'react';

import { Container, Pagination } from "react-bootstrap";

import { IPagination } from "../../inteerfaces";
import { returnPaginationRange } from "../../utils";

interface IProps {
    dataPagination: IPagination;
}

const PaginationApp: FC<IProps> = ({ dataPagination }) => {
    const { page, totalPages, pageChanger } = dataPagination;
    const disabledButtonPrev = (): boolean => {
        return page === 1;
    };
    const disabledButtonNext = (): boolean => {
        return page === totalPages;
    };
    let buttons = returnPaginationRange(dataPagination);

    return (
        <Container className='d-flex justify-content-center mt-4'>
            <Pagination>
                <Pagination.First onClick={ () => pageChanger('&laquo;') } disabled={ disabledButtonPrev() } />
                <Pagination.Prev onClick={ () => pageChanger('&lsaquo;') } disabled={ disabledButtonPrev() } />
                {
                    buttons.map(value => {
                        if (value === page) {
                            return (
                                <Pagination.Item key={ value } onClick={ () => pageChanger(value.toString()) } active>
                                    { value }
                                </Pagination.Item>
                            );
                        } else {
                            return (
                                <Pagination.Item key={ value } onClick={ () => pageChanger(value.toString()) }>
                                    { value }
                                </Pagination.Item>
                            );
                        }
                    })
                }
                <Pagination.Next onClick={ () => pageChanger('&rsaquo;') } disabled={ disabledButtonNext() } />
                <Pagination.Last onClick={ () => pageChanger('&raquo;') } disabled={ disabledButtonNext() } />
            </Pagination>
        </Container>
    );
};

export {
    PaginationApp
};
