import { useMemo } from "react";
import "components/styles/call-data-list.css";

interface CallDataListProps {
	title: string;
    content: any;
    contentType?: "text" | "list"
}

export default function CallDataList({ title, content, contentType="text" } : CallDataListProps) {
    const listData = useMemo(() => {
        if (content && contentType === "list") {
            if (content.length > 0) {
               let result = content.map(item => item.content);
               return result;
            } else {
                return null;
            }
        }
    }, [content]);

    return (
        <>
            <p className="data-title">{title}</p>
            <p>:</p>
            {contentType === "list" ? 
                (listData ? 
                    <ol className="list-container">
                        {listData.map(item => <li className="list-item">{item}</li>)}
                    </ol> 
                :
                    <p className="data-content">No {title.toLowerCase()}</p>
                )
            :
                <p className="data-content">{content}</p>
            }
        </>
    )
};