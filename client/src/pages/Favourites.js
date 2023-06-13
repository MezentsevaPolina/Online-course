import React from 'react';
import { useContext } from 'react'
import {Context} from "../index";
import { Table } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import CourseProduct from "../components/CourseProduct";

const FavouritesList = observer(() => {
    const { favourites } = useContext(Context)
    return (
        <>
            {favourites.count ? (
                <Table bordered hover size="sm" className="mt-3">
                    <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Количество</th>
                        <th>Цена</th>
                        <th>Сумма</th>
                        <th>Удалить</th>
                    </tr>
                    </thead>
                    <tbody>
                    {favourites.courses.map(item => <CourseProduct key={item.id} {...item} />)}

                    </tbody>
                </Table>
            ) : (
                <p>Ваша корзина пуста</p>
            )}
        </>
    )
})

export default FavouritesList;
