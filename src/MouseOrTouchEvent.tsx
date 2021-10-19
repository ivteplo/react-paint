// Copyright (c) 2021 Ivan Teplov

import { MouseEvent, TouchEvent } from 'react'

export type MouseOrTouchEvent<T> = MouseEvent<T> | TouchEvent<T>

export default MouseOrTouchEvent
