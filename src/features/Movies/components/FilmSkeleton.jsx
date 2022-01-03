import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Skeleton } from '@mui/material'

const FilmSkeleton = ({length}) => {
    return (
        <Box>
            <Grid container>
                {Array.from(new Array(length)).map((x,index)=>(
                    <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
                        <Box padding={2}>
                            <Skeleton  variant="rectangular" width="100%" height={118} />
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

FilmSkeleton.propTypes = {
    length: PropTypes.number
}
FilmSkeleton.defaultProps = {
    length: 6
}


export default FilmSkeleton