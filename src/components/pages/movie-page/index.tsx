import React, { useEffect } from "react";
import { useParams } from "react-router-dom"



export default function MoviePage(props: any) {
    const { movieId } = useParams();

    useEffect(() => {


    }, [movieId])
    return <div>
        <h1> Movie details: {movieId}</h1>

    </div>
}