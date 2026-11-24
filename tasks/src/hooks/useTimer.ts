import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerOptions {
    direction?: 'up' | 'down';
    interval?: number;
    startPaused?: boolean;
    onComplete?: () => void;
}

function useTimer(initialTime: number = 0, options: UseTimerOptions = {}
    ) {
        const {
        direction = 'up',
        interval = 1000,
        startPaused = false,
        onComplete
    } = options;
    const [time, setTime] = useState<number>(initialTime);
    const [isRunning, setIsRunning] = useState<boolean>(!startPaused);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const initialTimeRef = useRef(initialTime);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        initialTimeRef.current = initialTime;
        setTime(initialTime);
    }, [initialTime]);


    useEffect(()=>{
        if(isRunning){
            if(direction === 'up'){
                intervalRef.current = setInterval(()=>{
                    setTime(prevTime => prevTime + 1);
                }, interval);
            } else {
                intervalRef.current = setInterval(()=>{
                    setTime(prevTime => {
                        if(prevTime <= 1){
                            clearInterval(intervalRef.current!);
                            setIsRunning(false);
                            onCompleteRef.current?.();
                            return 0;
                        }
                        return prevTime - 1;
                    });
                }, interval);
            }
        } else {
            if(intervalRef.current){
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    },[isRunning,direction, interval]
    )
    const start = useCallback(() => {
        setIsRunning(true);
    }, []);

    const pause = useCallback(() => {
        setIsRunning(false);
    }, []);

    const resume = useCallback(() => {
        setIsRunning(true);
    }, []);

    const toggle = useCallback(() => {
        setIsRunning(prevIsRunning => !prevIsRunning);
    }, []);

    const reset = useCallback(() => {
        setTime(initialTimeRef.current);
        setIsRunning(!startPaused);
    }, [startPaused]);

    return { time, isRunning, start, pause, resume, reset, toggle };
}
export { useTimer };