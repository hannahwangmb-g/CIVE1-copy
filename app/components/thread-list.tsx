import React, { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import styles from './thread-list.module.css';

const TrashIcon = () => (
  <svg
    className={styles.fileDeleteIcon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    height="12"
    width="12"
    fill="#353740"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.15736 1.33332C4.8911 1.33332 4.65864 1.51361 4.59238 1.77149L4.4214 2.43693H7.58373L7.41275 1.77149C7.34649 1.51361 7.11402 1.33332 6.84777 1.33332H5.15736ZM8.78829 2.43693L8.54271 1.48115C8.34393 0.707516 7.64653 0.166656 6.84777 0.166656H5.15736C4.35859 0.166656 3.6612 0.707515 3.46241 1.48115L3.21683 2.43693H1.33333C1.01117 2.43693 0.75 2.6981 0.75 3.02026C0.75 3.34243 1.01117 3.6036 1.33333 3.6036H1.39207L2.10068 10.2683C2.19529 11.1582 2.94599 11.8333 3.84087 11.8333H8.15913C9.05401 11.8333 9.80471 11.1582 9.89932 10.2683L10.6079 3.6036H10.6667C10.9888 3.6036 11.25 3.34243 11.25 3.02026C11.25 2.6981 10.9888 2.43693 10.6667 2.43693H8.78829ZM9.43469 3.6036H2.56531L3.2608 10.145C3.29234 10.4416 3.54257 10.6667 3.84087 10.6667H8.15913C8.45743 10.6667 8.70766 10.4416 8.7392 10.145L9.43469 3.6036ZM4.83333 4.83332C5.1555 4.83332 5.41667 5.09449 5.41667 5.41666V8.33332C5.41667 8.65549 5.1555 8.91666 4.83333 8.91666C4.51117 8.91666 4.25 8.65549 4.25 8.33332V5.41666C4.25 5.09449 4.51117 4.83332 4.83333 4.83332ZM7.16667 4.83332C7.48883 4.83332 7.75 5.09449 7.75 5.41666V8.33332C7.75 8.65549 7.48883 8.91666 7.16667 8.91666C6.8445 8.91666 6.58333 8.65549 6.58333 8.33332V5.41666C6.58333 5.09449 6.8445 4.83332 7.16667 4.83332Z"
    />
  </svg>
);

const EditIcon = () => (
  <svg
    className={styles.fileEditIcon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height="12"
    width="12"
    fill="#353740"
  >
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
);


interface Thread {
  id: string;
  name: string;
}

interface ThreadListProps {
  currentThreadId: string;
  onThreadSelect: (threadId: string) => void;
}

const ThreadList = forwardRef(({ currentThreadId, onThreadSelect }: ThreadListProps, ref) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [editingThreadId, setEditingThreadId] = useState<string | null>(null);
  const [newThreadName, setNewThreadName] = useState<string>("");

  const fetchThreads = async () => {
    const response = await fetch('/api/assistants/threads/history');
    const threadData = await response.json();
    setThreads(threadData.reverse());
  };

  useImperativeHandle(ref, () => ({
    fetchThreads
  }));

  useEffect(() => {
    fetchThreads();
    const interval = setInterval(fetchThreads, 3000);
    return () => clearInterval(interval);
  }, []);

  const deleteThread = async (threadId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch('/api/assistants/threads/history', {
        method: 'DELETE',
        body: JSON.stringify({ threadId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setThreads((prevThreads) => {
          const updatedThreads = prevThreads.filter((thread) => thread.id !== threadId);
          if (threadId === currentThreadId && updatedThreads.length > 0) {
            // 如果删除的是当前对话的线程，自动选择一个新的线程
            const newCurrentThreadId = updatedThreads[0].id;
            onThreadSelect(newCurrentThreadId);
          }
          return updatedThreads;
        });
      }
    } catch (error) {
      console.error('删除线程失败:', error);
    }
    await fetchThreads();
  };


  const updateThreadName = async (threadId: string) => {
    try {
      const response = await fetch('/api/assistants/threads/history', {
        method: 'PUT',
        body: JSON.stringify({ threadId, newName: newThreadName }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setThreads((prevThreads) =>
          prevThreads.map((thread) =>
            thread.id === threadId ? { ...thread, name: newThreadName } : thread
          )
        );
        setEditingThreadId(null);
        setNewThreadName("");
      }
    } catch (error) {
      console.error('更新线程名称失败:', error);
    }
  };

  return (
    <div className={styles.sidebar}>
      <h3>Conversation History</h3>
      {threads.map((thread) => (
        <div
          key={thread.id}
          className={`${styles.threadItem} ${thread.id === currentThreadId ? styles.active : ''}`}
          onClick={() => onThreadSelect(thread.id)}
        >
          {editingThreadId === thread.id ? (
            <input
              type="text"
              value={newThreadName}
              onChange={(e) => setNewThreadName(e.target.value)}
              onBlur={() => updateThreadName(thread.id)}
              className={styles.threadNameInput}
            />
          ) : (
            <>
              <span>{thread.name}</span>
              <button
                className={styles.editBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingThreadId(thread.id);
                  setNewThreadName(thread.name);
                }}
              >
                <EditIcon />
              </button>
            </>
          )}
          <button 
            className={styles.deleteBtn}
            onClick={(e) => deleteThread(thread.id, e)}
          >
            <TrashIcon />
          </button>
        </div>
      ))}
    </div>
  );
});

export default ThreadList;