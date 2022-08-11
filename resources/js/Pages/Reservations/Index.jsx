import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import Moment from "moment"; // -- moment library for formatting dates in react
import Pagination from "@/Components/Pagination";

export default function Reservations(props) {
    const { reservations } = usePage().props;

    function destroy(e) {
        if (confirm("Are you sure you want to delete this reservation?")) {
            Inertia.delete(route("reservations.destroy", e.currentTarget.id));
        }
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Reservations
                </h2>
            }
        >
            <Head title="Reservations" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                    href={route("reservations.create")}
                                >
                                    Create reservation
                                </Link>
                            </div>

                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 w-20">No.</th>
                                        <th className="px-4 py-2">
                                            Client name
                                        </th>
                                        <th className="px-4 py-2 w-20">Room</th>
                                        <th className="px-4 py-2">Date</th>
                                        <th className="px-4 py-2 w-20">
                                            No days
                                        </th>
                                        <th className="px-4 py-2">Last day</th>
                                        <th className="px-4 py-2">Price</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {reservations.data.map(
                                        ({
                                            id,
                                            client_name,
                                            room_name,
                                            date,
                                            no_days,
                                            no_persons,
                                            reservation_price,
                                        }) => (
                                            <tr>
                                                <td className="border px-4 py-2">
                                                    {id}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {client_name}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    {room_name}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    {Moment(date).format(
                                                        "DD-MM-YYYY"
                                                    )}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    {no_days}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    {Moment(date)
                                                        .add(no_days, "days")
                                                        .format("DD-MM-YYYY")}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    {reservation_price}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    <Link
                                                        tabIndex="1"
                                                        className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                        href={route(
                                                            "reservations.edit",
                                                            id
                                                        )}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={destroy}
                                                        id={id}
                                                        tabIndex="-1"
                                                        type="button"
                                                        className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    )}

                                    {reservations.length === 0 && (
                                        <tr>
                                            <td
                                                className="px-6 py-4 border-t"
                                                colSpan="4"
                                            >
                                                No reservations found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <Pagination
                                class="mt-6"
                                links={reservations.links}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
