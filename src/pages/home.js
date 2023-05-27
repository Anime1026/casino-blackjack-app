import React, { useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
    loaderUrl: "build/Build/build.loader.js",
    dataUrl: "build/Build/build.data.unityweb",
    frameworkUrl: "build/Build/build.framework.js.unityweb",
    codeUrl: "build/Build/build.wasm.unityweb"
});

function Home() {
    const [percent, setPercent] = useState(false);
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        unityContext.on("progress", (progress) => {
            setProgress(progress * 1.11 * 100);
            if (progress === 1) {
                setPercent(true);
            }
        })
    }, [])
    return (
        <div>
            {!percent && (
                <div className="wait">
                    <div className="percent">
                        <div className="progress" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            )}
            <Unity
                unityContext={unityContext}
                matchWebGLToCanvasSize={true}
            />
        </div>
    );
}

export default Home